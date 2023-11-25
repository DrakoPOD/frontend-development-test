<template>
  <div
    draggable="true"
    class="card col-12 px-0"
    s
    @mouseover.prevent="() => (mouseover = true)"
    @mouseleave.prevent="() => (mouseover = false)"
    @dragstart="() => (isDragging = true)"
    @dragend.prevent="() => (isDragging = false)"
  >
    <div class="card-body">
      <div class="form-check fw-bold">
        <input
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
        {{ task.descriprion }}
      </p>

      <span
        class="badge rounded-pill text-bg-primary me-1"
        :class="['algo']"
        v-for="tag in task.tags"
        >{{ tag }}</span
      >
      <div class="d-flex">
        <p class="card-text fw-lighter p-0 m-0 flex-grow-1">
          <i class="bi bi-clock mr-2"></i>{{ " " + task.due }}
        </p>
        <p class="card-text m-0">{{ task.asingned }}</p>
      </div>
    </div>
    <div
      class="options d-flex flex-row g-0 align-items-start"
      :class="mouseover && !isDragging ? 'options-show' : 'options-hide'"
    >
      <button class="btn p-0 m-0" @click.prevent="editTask">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="btn p-0 m-0">
        <i class="bi bi-trash" @click="deleteTask"></i>
      </button>
    </div>
  </div>
  <DropArea />
</template>

<script setup lang="ts">
import type { ITask } from "@/types/task";
import { ref, computed } from "vue";
import { useTaskStore } from "@/store/store";

import DropArea from "./DropArea.vue";

interface Props {
  task: ITask;
  selectMode: boolean;
  idx: number;
}

withDefaults(defineProps<Props>(), {
  selectMode: false,
});

const taskStore = useTaskStore();

const mouseover = ref(false);
const selected = ref(false);

const isDragging = computed({
  set: (val: boolean) => {
    taskStore.isDragging = val;
  },
  get: () => taskStore.isDragging,
});

async function editTask() {
  console.log("Edited");
}

async function deleteTask() {
  console.log("Deleted");
}
</script>
<style scoped>
.card {
  position: relative;
}

/* .card::before {
  content: "";
  position: absolute;
  background-color: blue;
  width: 96%;
  height: 5px;
  margin: 0px 2%;
  top: -5%;
  border-radius: 10%;
  opacity: 0.5;
  transition: 0.3 ease-in;
}

.card::after {
  content: "";
  position: absolute;
  background-color: blue;
  width: 96%;
  height: 5px;
  margin: 0px 2%;
  top: 103%;
  border-radius: 10%;
  opacity: 0.5;
  transition: 0.3 ease-in;
} */

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
