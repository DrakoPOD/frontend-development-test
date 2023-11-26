<template>
  <div class="skeleton">&nbsp;</div>
</template>

<script setup lang="ts">
interface Props {
  height?: string;
  width?: string;
  borderRadius?: string;
}

withDefaults(defineProps<Props>(), {
  height: "30px",
  borderRadius: "0px",
});
</script>

<style scoped>
@keyframes animateGradient {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: -100% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

.skeleton {
  height: v-bind(height);
  width: v-bind(width);

  border-radius: v-bind(borderRadius);

  background: rgb(209, 209, 209);
  background: linear-gradient(90deg,
      rgba(209, 209, 209, 1) 0%,
      rgba(170, 170, 170, 1) 29%,
      rgba(170, 170, 170, 1) 71%,
      rgba(209, 209, 209, 1) 100%);

  background-size: 200% 100%;

  animation: animateGradient 1.5s linear infinite;
}
</style>
