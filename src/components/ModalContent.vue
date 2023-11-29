<template>
  <div class="custom-modal">
    <div class="overlay" @click="emits('overlayClick')"></div>
    <div class="modal-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  persistent?: boolean;
}

interface Emits {
  (e: "overlayClick"): void;
}
const props = withDefaults(defineProps<Props>(), {
  persistent: false,
});
const emits = defineEmits<Emits>();
</script>

<style scoped>
.custom-modal {
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: 100;

  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  width: 100vw;
  height: 100%;

  background-color: rgb(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  z-index: -1;
}
</style>
