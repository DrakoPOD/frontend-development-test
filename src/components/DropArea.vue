<template>
  <div
    style="position: relative; width: 100%; height: 0"
    :style="{ 'z-index': isDragging ? 80 : 0 }"
  >
    <div
      disabled
      class="drop-line"
      :class="dragOver ? '.drop-line-show' : 'drop-line-hide'"
    ></div>
    <div
      class="ghost-area"
      :class="isDragging ? 'drag-over' : 'drag-none'"
      @dragover.prevent="() => (dragOver = true)"
      @drop.prevent="() => (dragOver = false)"
      @dragleave.prevent="() => (dragOver = false)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTaskStore } from "@/store/store";

const taskStore = useTaskStore();

const dragOver = ref(false);
const isDragging = ref(false);

taskStore.$subscribe(
  () => {
    setTimeout(() => (isDragging.value = taskStore.isDragging), 1);
  },
  { detached: true }
);
</script>
<style scoped>
.drop-line {
  background-color: blue;
  width: 96%;
  height: 5px;
  margin: 0 2%;
  position: absolute;
  top: 0;
  border-radius: 5px;
  transition: all 0.3s linear;
  left: 0;
}

.drop-line-show {
  opacity: 1;
  visibility: visible;
}
.drop-line-hide {
  opacity: 0;
  visibility: hidden;
}

.ghost-area {
  top: -50px;
  left: 0;
  height: 600px;
  width: 100%;
  position: absolute;

  background-color: transparent;
  opacity: 0;
}

.drag-over {
}

.drag-none {
  display: none;
  pointer-events: none;
}
</style>
