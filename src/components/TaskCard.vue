<template>
  <div
    draggable="true"
    class="card col-12 px-0"
    @mouseover.prevent="() => (mouseover = true)"
    @mouseleave.prevent="() => (mouseover = false)"
    @dragstart="dragStart"
    @dragend.prevent="dragEnd"
  >
    <div class="card-body">
      <div class="form-check fw-bold">
        <input
          :disabled="!selectMode"
          class="form-check-input"
          :class="selectMode ? 'select-show' : 'select-hide'"
          type="checkbox"
          v-model="selected"
          id="selectMode"
        />
        <label for="selectMode" class="form-check-label card-title">{{
          task.title
        }}</label>
      </div>

      <p class="card-text mb-1">
        {{ task.description }}
      </p>

      <span
        class="badge rounded-pill text-bg-primary me-1"
        :class="['algo']"
        v-for="tag in task.tags"
        >{{ tag }}</span
      >
      <div class="d-flex">
        <p class="card-text fw-lighter p-0 m-0 flex-grow-1 text-nowrap">
          <i class="bi bi-clock mr-2"></i
          >{{ " " + (task.due ? moment(task.due).format("MMM DD YY") : "---") }}
        </p>
        <p class="card-text m-0">{{ task.assigned }}</p>
      </div>
    </div>
    <div
      class="options btn-group border"
      :class="mouseover && !isDragging ? 'options-show' : 'options-hide'"
    >
      <button class="btn btn-light p-0 m-0" @click.prevent="editTask">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="btn btn-light p-0 m-0">
        <i class="bi bi-trash" @click="deleteTask"></i>
      </button>
    </div>
  </div>
  <DropArea :idx="idx + 1" :status="task.status" />
</template>

<script setup lang="ts">
import type { ITask } from "@/types/task";
import { ref, computed } from "vue";
import { useDragStore } from "@/store/dragStore";
import { useTaskStore } from "@/store/taskStore";

import DropArea from "./DropArea.vue";
import moment from "moment";

interface Props {
  task: ITask;
  selectMode?: boolean;
  idx: number;
}

const props = withDefaults(defineProps<Props>(), {
  selectMode: false,
});

const dragStore = useDragStore();
const taskStore = useTaskStore();

const mouseover = ref(false);
const selected = ref(false);

const isDragging = computed({
  set: (val: boolean) => {
    dragStore.isDragging = val;
  },
  get: () => dragStore.isDragging,
});

function dragStart() {
  isDragging.value = true;
  dragStore.dragIdx = props.idx;
}

function dragEnd() {
  isDragging.value = false;
  dragStore.dragIdx = null;
}

async function editTask() {
  taskStore.edittask = { ...props.task };
  taskStore.idxTask = props.idx;
  taskStore.formMode = "edit";
  taskStore.openModal = true;
}

async function deleteTask() {
  taskStore.idxTask = props.idx;
  taskStore.openDeleteModal = true;
}
</script>
<style scoped>
.card {
  position: relative;
}
.options {
  position: absolute;
  left: 100%;
  transform: translate(-100%, 0);
  transition: all 0.3s ease-in;
}

.options-show {
  opacity: 1;
  visibility: visible;
}

.options-hide {
  display: none !important;
  opacity: 0;
  visibility: hidden;
}

.select-hide {
  display: none !important;
  opacity: 0;
}

.select-show {
  opacity: 1;
}

.options > .btn {
  width: 30px;
  height: 30px;
}
</style>
