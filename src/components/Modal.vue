<template>
  <Teleport to="#app">
    <Transition
      name="slide"
      v-on:after-leave="changeOverflow"
      v-on:before-enter="disableOverflow"
    >
      <ModalContent v-if="modelValue" @overlay-click="overlayClick">
        <slot />
      </ModalContent>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import ModalContent from "./ModalContent.vue";

interface Props {
  modelValue: boolean;
  persistent: boolean;
}

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  persistent: false,
});

const emits = defineEmits<Emits>();

function overlayClick() {
  if (props.persistent) return;
  emits("update:modelValue", false);
}

function changeOverflow() {
  document.body.style.overflow = "auto";
}

function disableOverflow() {
  document.body.style.overflow = "hidden";
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100vh);
}
</style>
