<template>
  <tr class="loader-row">
    <td>
      <SkeletonLoader height="25px" width="300px" border-radius="5px" />
    </td>
    <td>
      <SkeletonLoader height="25px" width="80px" border-radius="5px" />
    </td>
    <td>
      <div class="d-flex flex-row flex-wrap gap-2">
        <SkeletonLoader height="25px" width="50px" border-radius="25px" />
        <SkeletonLoader height="25px" width="50px" border-radius="25px" />
        <SkeletonLoader height="25px" width="50px" border-radius="25px" />
      </div>
    </td>
    <td>
      <SkeletonLoader height="25px" width="120px" border-radius="5px" />
    </td>
    <td>
      <SkeletonLoader height="25px" width="80px" border-radius="5px" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import SkeletonLoader from "./SkeletonLoader.vue";
</script>
