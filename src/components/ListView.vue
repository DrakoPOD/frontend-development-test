<template>
  <div class="table-responsive-sm">
    <table class="table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key">{{ header.name }}</th>
        </tr>
      </thead>
      <tbody ref="sortList" class="prevent-select">
        <template v-if="!loading">
          <tr
            v-for="(task, idx) in taskList"
            :key="task.id"
            @mouseover="mouseOverRow = idx"
            @mouseleave="mouseOverRow = null"
          >
            <th scope="row">{{ task.title }}</th>
            <!-- <td>{{ task.description }}</td> -->
            <td class="align-middle">
              <span class="badge" :class="statusColors[task.status]">{{
                TaskStatusNames[task.status]
              }}</span>
            </td>
            <td class="align-middle">
              <div class="d-flex flex-row gap-1 flex-wrap">
                <span
                  v-for="tag in task.tags"
                  class="badge bg-primary rounded-pill"
                  >{{ tag }}</span
                >
              </div>
            </td>
            <td>{{ task.assigned }}</td>
            <td>{{ task.due }}</td>

            <div
              class="options btn-group border p-0"
              :class="
                mouseOverRow == idx && !dragging
                  ? 'options-show'
                  : 'options-hide'
              "
            >
              <button
                class="btn btn-light p-1 m-0"
                @click.prevent="editTask(task, idx)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-light p-1 m-0">
                <i class="bi bi-trash" @click="deleteTask(idx)"></i>
              </button>
            </div>
          </tr>
        </template>
        <template v-else>
          <LoadingRow
            v-for="num in Array.from({ length: 7 }, (_, index) => index)"
          />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { onMounted, ref } from "vue";

import LoadingRow from "@/components/LoadingRow.vue";

import type { ITask } from "@/types/task";

import { TaskStatusNames } from "@/types/task.enums";
import { useDragStore } from "@/store/dragStore";
import { useTaskStore } from "@/store/taskStore";

const statusColors = {
  0: "bg-secondary",
  1: "bg-warning",
  2: "bg-success",
};
const headers = [
  { name: "Title", key: "title", sortable: false },
  // { name: "Description", key: "description", sortable: false },
  { name: "Status", key: "status", sortable: false },
  { name: "Tags", key: "tag", sortable: false },
  { name: "Assigned", key: "assigned", sortable: false },
  { name: "Due date", key: "due", sortable: false },
];

interface Props {
  taskList: ITask[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  taskList: () => [],
  loading: false,
});

const dragStore = useDragStore();
const taskStore = useTaskStore();

const sortList = ref<HTMLElement>();
var sortable: ReturnType<typeof Sortable.create>;

const mouseOverRow = ref<number | null>(null);
const dragging = ref(false);

onMounted(() => {
  sortable = Sortable.create(sortList.value!, {
    animation: 100,
    ghostClass: "ghost-task",
    filter: ".loader-row",
    onEnd: (evt) => {
      dragging.value = false;
      console.log(evt.oldIndex, evt.newIndex);
      dragStore.sortIndexTask(evt.oldIndex, evt.newIndex);
    },
    onStart: () => {
      dragging.value = true;
    },
  });
});

async function editTask(task: ITask, idx: number) {
  taskStore.edittask = { ...task };
  taskStore.idxTask = idx;
  taskStore.formMode = "edit";
  taskStore.openModal = true;
}

async function deleteTask(idx: number) {
  taskStore.idxTask = idx;
  taskStore.openDeleteModal = true;
}
</script>
<style scoped>
.prevent-select {
  user-select: none;
}

.ghost-task {
  opacity: 0;
}

tbody > tr {
  position: relative;
}

.options {
  position: absolute;
  top: 5%;
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
</style>
