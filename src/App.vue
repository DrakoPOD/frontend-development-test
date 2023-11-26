<template>
  <div class="container container-fluid p-3">
    <div class="row g-2">
      <div class="col-12 d-flex flex-row">
        <h1 class="flex-grow-1">Task Board</h1>
        <button class="btn btn-primary" @click="openModal = true">
          Add Task
        </button>
      </div>
      <div class="col-12">
        <div class="row">
          <Column
            v-for="{ key, name } in columsNames"
            :key="key"
            :title="name"
            :loading="isLoading"
            :task-list="taskByStatus[key]"
          />
        </div>
        <Modal v-model="openModal" persistent>
          <div class="card">
            <div class="card-body" style="width: 400px">
              <NewTask mode="add" />
              <button class="btn btn-danger mt-2" @click="openModal = false">
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Column from "./components/Column.vue";
import NewTask from "./components/NewTask.vue";
import Modal from "@/components/Modal.vue";

import { TaskStatusNames, TaskStatus } from "@/types/task.enums";
import type { ITask, ITaskStutus } from "./types/task";

import { useTaskStore } from "@/store/taskStore";

const openModal = ref(false);
const isLoading = ref(true);

const taskStore = useTaskStore();
const taskList = ref<ITask[]>([]);

const columsNames = Object.keys(TaskStatusNames).map((key) => ({
  key: Number(key),
  name: TaskStatusNames[Number(key) as ITaskStutus],
}));

async function getTaskList() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  taskList.value = taskStore.tasks;
  isLoading.value = false;
}

const taskFiltered = computed(() => taskList.value);

const taskByStatus = computed(() => {
  const cols: Record<number, ITask[]> = {};
  columsNames.forEach((status) => {
    cols[status.key] = taskFiltered.value.filter((x) => x.status == status.key);
  });
  return cols;
});

onMounted(async () => {
  await getTaskList();
});
</script>

<style scoped></style>
