<template>
  <div class="container container-fluid p-3">
    <div class="row g-2">
      <div class="col-12 d-flex flex-row gap-2 align-center">
        <h1 class="flex-grow-1">Task Board</h1>
        <div class="input-group aling-center align-self-center">
          <input
            type="text"
            class="form-control"
            aria-describedby="searchInput"
            v-model="searchTask"
            :disabled="isLoading"
          />
          <span class="input-group-text border-0">
            <i class="bi bi-search"></i>
          </span>
        </div>
        <button
          class="btn btn-primary"
          @click="taskStore.openModal = true"
          :disabled="isLoading"
        >
          Add Task
        </button>
      </div>
      <div class="col-12">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: currentTab == 'kanban' }"
              @click="changeTab('kanban')"
            >
              <span class="m-2"><i class="bi bi-kanban"></i></span>Kanban
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: currentTab == 'list' }"
              @click="changeTab('list')"
            >
              <span class="m-2"><i class="bi bi-list-task"></i></span>List
            </button>
          </li>
        </ul>
      </div>
      <div class="col-12">
        <div class="row">
          <template v-if="currentTab == 'kanban'">
            <Column
              v-for="{ key, name } in columsNames"
              :key="key"
              :title="name"
              :loading="isLoading"
              :task-list="taskFilteredWithStatus[key]"
              :status="key"
            />
          </template>
          <template v-else>
            <list-view :task-list="taskFiltered" :loading="isLoading" />
          </template>
        </div>
      </div>
    </div>
    <Modal v-model="taskStore.openModal" persistent>
      <div class="card">
        <div class="card-body" style="width: 400px">
          <NewTask :mode="taskStore.formMode" />
          <button
            class="btn btn-danger mt-2"
            @click="() => taskStore.clearControls()"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
    <Modal v-model="taskStore.openDeleteModal" persistent>
      <div class="card">
        <div class="card-body">
          <p class="card-text">Are you sure that you want delete this task?</p>
          <p class="card-text">This action can't be undoned</p>
        </div>
        <div class="card-footer d-grip gap-3 d-md-flex justify-content-md-end">
          <button
            class="btn btn-danger"
            @click="taskStore.deleteTask(taskStore.idxTask)"
          >
            Accept
          </button>
          <button
            class="btn btn-secondary"
            @click="() => taskStore.clearControls()"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStorage } from "@vueuse/core";

import Column from "./components/Column.vue";
import NewTask from "./components/NewTask.vue";
import Modal from "@/components/Modal.vue";
import ListView from "./components/ListView.vue";

import type { ITask, ITaskStutus } from "./types/task";

import { TaskStatusNames } from "@/types/task.enums";
import { useTaskStore } from "@/store/taskStore";
import { filterTask } from "./utils/utilFuncs";

const isLoading = ref(true);

const taskStore = useTaskStore();
const taskList = ref<ITask[]>([]);

const searchTask = ref("");
const currentTab = useStorage<"kanban" | "list">("view-mode", "kanban");

function changeTab(tabName: "kanban" | "list") {
  currentTab.value = tabName;
}

const columsNames = Object.keys(TaskStatusNames).map((key) => ({
  key: Number(key),
  name: TaskStatusNames[Number(key) as ITaskStutus],
}));

async function getTaskList() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  taskList.value = taskStore.tasks;
  isLoading.value = false;
}

const taskFiltered = computed(() =>
  filterTask(taskStore.tasks, searchTask.value)
);

const taskFilteredWithStatus = computed(() => {
  const filtered = filterTask(taskStore.tasks, searchTask.value).map(
    (task, idx) => ({ task, idx })
  );

  const cols: Record<number, { task: ITask; idx: number }[]> = {};

  columsNames.forEach((status) => {
    cols[status.key] = filtered.filter(({ task }) => task.status == status.key);
  });

  return cols;
});

onMounted(async () => {
  await getTaskList();
});
</script>

<style scoped>
.input-group {
  width: 250px !important;
  align-items: center;
}

.container {
  height: 100%;
}
</style>
