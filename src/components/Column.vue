<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-header">{{ props.title }}</div>
      <div class="card-body">
        <div class="row g-2">
          <template v-if="!loading">
            <TaskCard
              v-for="(task, idx) in taskList"
              :task="task"
              :idx="idx"
              :key="idx"
            />
          </template>
          <template v-else>
            <LoaderCard />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from "@/types/task";
import TaskCard from "./TaskCard.vue";
import LoaderCard from "@/components/LoaderCard.vue";
import { sampleTask } from "@/utils/samples";

interface Props {
  title: string;
  taskList: ITask[];
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "To Do",
  taskList: () => [],
  loading: false,
});

const arrayTask = Array(1).fill(sampleTask);
</script>
