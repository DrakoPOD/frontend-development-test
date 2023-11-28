<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-header">
        <div class="d-flex gap-2 flex-row align-center align-items-center">

          <button class="btn" @click="selectMode"  :class="{'btn-secondary active': activeDrag}"><i class="bi bi-list-check" style="font-size: 1.5rem;"></i></button>
          <div>
            <h4 class="card-title">
              {{ props.title }}
            </h4>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-2">
          <template v-if="!loading">
            <DropArea :idx="0" :status="status" />
            <TaskCard
              v-for="{ task, idx } in taskList"
              :task="task"
              :idx="idx"
              :key="idx"
              :draggable="allowDrag"
              :select-mode="activeDrag"
              ref="taskCards"
            />
          </template>
          <template v-else>
            <LoaderCard />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from "@/types/task";
import TaskCard from "./TaskCard.vue";
import LoaderCard from "@/components/LoaderCard.vue";
import DropArea from "@/components/DropArea.vue";
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useDragStore } from "@/store/dragStore";

interface Props {
  title: string;
  taskList: { task: ITask; idx: number }[];
  loading?: boolean;
  status: number;
}
const props = withDefaults(defineProps<Props>(), {
  title: "To Do",
  taskList: () => [],
  loading: false,
});

const dragStore = useDragStore()

const taskCards = ref<Array<InstanceType<typeof TaskCard>>>([])

const allowDrag = computed(()=>{
  if (dragStore.currentColumn == null) return true
  if (dragStore.currentColumn == props.status) return true
  return false
})

const activeDrag = computed(()=> dragStore.currentColumn == props.status)

function selectMode(){
  dragStore.dragList = null
  if(dragStore.currentColumn != props.status){
    dragStore.currentColumn = props.status
  } else {
    dragStore.currentColumn = null
  }
}

const cardSelected = computed(()=>{ 
  const arr = taskCards.value.map(x=> x.selected)
  if(activeDrag.value){
    const cardArr = props.taskList.flatMap((task,i)=> arr[i] ? [task.idx] : [] )
    dragStore.dragList = cardArr
  }
  return arr
})
</script>
