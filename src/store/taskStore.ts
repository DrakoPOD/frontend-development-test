import type { ITask, ITaskStutus } from "@/types/task";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { TaskStatus } from "@/types/task.enums";
import { sampleTasksList } from "@/utils/samples";

import { ref } from "vue";

type IUseStorage<T> = ReturnType<typeof useStorage<T>>;

export const useTaskStore = defineStore("tasks", () => {
  const tasks: IUseStorage<ITask[]> = useStorage<ITask[]>(
    "TASK_LIST",
    sampleTasksList,
    localStorage
  );

  const edittask = ref<ITask | null>(null);
  const formMode = ref<"add" | "edit">("add");
  const openModal = ref(false);
  const openDeleteModal = ref(false);
  const idxTask = ref<number | null>(null);

  const deleteTask = (idx: number | null) => {
    openDeleteModal.value = false;
    idxTask.value = null;
    if (idx == null) return;
    tasks.value.splice(idx, 1);
    clearControls();
  };

  const addTask = (task: ITask | null) => {
    if (!task) return;
    tasks.value.push(task);
    clearControls();
  };

  const updateTask = (task: ITask | null, idx: number | null) => {
    if (!task) return;
    if (idx == null) return;

    tasks.value[idx] = task;
    clearControls();
  };

  const clearControls = () => {
    openModal.value = false;
    openDeleteModal.value = false;
    formMode.value = "add";
    edittask.value = null;
    idxTask.value = null;
  };

  return {
    tasks,
    edittask,
    formMode,
    openModal,
    openDeleteModal,
    idxTask,
    deleteTask,
    addTask,
    updateTask,
    clearControls,
  };
});
