<template>
  <div class="card col-12 px-0">
    <div class="card-body">
      <div class="form-check mb-3 d-flex flex-row">
        <div style="width: 15px"></div>
        <SkeletonLoader class="flex-grow-1" />
      </div>
      <SkeletonLoader height="20px" class="mb-2" />

      <div class="d-flex flex-row gap-2 mb-2">
        <SkeletonLoader
          v-for="n in [1, 2, 3]"
          height="20px"
          width="40px"
          :border-radius="'20px'"
        />
      </div>
      <div class="d-flex flex-row gap-2">
        <SkeletonLoader v-for="n in [1, 2]" height="20px" width="100%" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SkeletonLoader from "./SkeletonLoader.vue";
</script>

<style></style>
