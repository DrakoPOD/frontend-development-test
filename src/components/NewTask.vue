<template>
  <form @submit.prevent="">
    <h1>{{ mode == "add" ? "Add Task" : "Edit Task" }}</h1>
    <CustomInput
      v-model="task.title"
      label="Title:"
      :rules="validationRules.title!"
      required
    />
    <CustomInput v-model="task.description" label="Description:" />
    <div class="mb-4">
      <label for="inputTags" class="form-label">Tags:</label>
      <TagInput v-model="task.tags" />
    </div>
    <CustomInput v-model="task.assigned" label="Assigne to:" />
    <div class="mb-4 input-group">
      <label for="inputStatus" class="input-group-text">Status</label>
      <select
        for="inputStatus"
        class="form-select"
        aria-label="Task Status"
        v-model="task.status"
      >
        <option v-for="{ label, value } in taskStatusOptions" :value="value">
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
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      @click="mode == 'add' ? addTask() : editTask()"
    >
      {{ mode == "add" ? "Add task" : "Save Changes" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TaskStatusNames } from "@/types/task.enums";
import type { ITask, ITaskStutus } from "@/types/task";
import TagInput from "@/components/TagInput.vue";
import CustomInput from "@/components/CustomInput.vue";

import type { IValidateObjectOfRules } from "@/types/funcTypes";

interface Props {
  mode: "add" | "edit";
}

interface Emits {
  (e: "task-added"): void;
}

withDefaults(defineProps<Props>(), {
  mode: "add",
});

const emits = defineEmits<Emits>();

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
  console.log("Task added");
  emits("task-added");
}

function editTask() {
  console.log("Task Edited");
}
</script>

<style scoped></style>
