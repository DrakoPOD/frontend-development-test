<template>
  <form ref="myForm" @submit.prevent="" data-test="formTask">
    <h1>{{ mode == "add" ? "Add Task" : "Edit Task" }}</h1>
    <CustomInput
      v-model="task.title"
      label="Title:"
      :rules="validationRules.title!"
      required
      data-test="inputTitle"
    />
    <CustomInput
      v-model="task.description"
      label="Description:"
      data-test="inputDescription"
    />
    <div class="mb-4">
      <label for="inputTags" class="form-label">Tags:</label>
      <TagInput v-model="task.tags" data-test="inputTag" />
    </div>
    <CustomInput
      v-model="task.assigned"
      label="Assigne to:"
      data-test="inputAssigned"
    />
    <div class="mb-4 input-group">
      <label for="inputStatus" class="input-group-text">Status</label>
      <select
        for="inputStatus"
        class="form-select"
        aria-label="Task Status"
        v-model="task.status"
        data-test="selectStatus"
      >
        <option
          v-for="{ label, value } in taskStatusOptions"
          :value="Number(value)"
        >
          {{ label }}
        </option>
      </select>
    </div>
    <div class="mb-3 input-group">
      <label for="inputDue" class="input-group-text">Due Date:</label>
      <input
        type="date"
        class="form-control"
        id="inputDue"
        v-model="task.due"
        data-test="inputDue"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="addTask()">
      {{ mode == "add" ? "Add task" : "Save Changes" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { TaskStatusNames } from "@/types/task.enums";
import type { ITask, ITaskStutus } from "@/types/task";
import TagInput from "@/components/TagInput.vue";
import CustomInput from "@/components/CustomInput.vue";

import { useTaskStore } from "@/store/taskStore";

import type { IValidateObjectOfRules } from "@/types/funcTypes";
import { emit } from "process";

interface Props {
  mode: "add" | "edit";
}

interface Emits {
  (e: "task-added", value: object): void;
}

withDefaults(defineProps<Props>(), {
  mode: "add",
});

const emits = defineEmits<Emits>();

const taskStore = useTaskStore();

const myForm = ref<HTMLFormElement>();

const taskStatusOptions = Object.keys(TaskStatusNames).map((key) => {
  return {
    label: TaskStatusNames[Number(key) as ITaskStutus],
    value: key,
  };
});

const task = ref<ITask>({
  title: "",
  description: "",
  tags: [],
  assigned: "",
  status: 0,
  due: "",
});

const validationRules: IValidateObjectOfRules = {
  title: [
    (v: string) =>
      (!!v && v.length > 3) || "Task title is must be more than 3 characters",
  ],
};

function addTask() {
  if (!myForm.value) return;

  const valid = myForm.value.querySelector('[invalid="true"]');

  if (valid) return;

  if (taskStore.formMode == "add") {
    emits("task-added", task.value);
    taskStore.addTask(task.value);
  } else {
    taskStore.updateTask(task.value, taskStore.idxTask);
  }
}

onBeforeMount(() => {
  if (taskStore.formMode == "edit") {
    if (!taskStore.edittask) return;
    task.value = taskStore.edittask;
  }
});
</script>

<style scoped></style>
