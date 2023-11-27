<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-header">{{ props.title }}</div>
      <div class="card-body">
        <div class="row g-2">
          <template v-if="!loading">
            <DropArea :idx="0" :status="status" />
            <TaskCard
              v-for="{ task, idx } in taskList"
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
import DropArea from "@/components/DropArea.vue";

interface Props {
  title: string;
  taskList: { task: ITask; idx: number }[];
  loading?: boolean;
  status: number;
}
const props = withDefaults(defineProps<Props>(), {
  title: "To Do",
  taskList: () => [],
  loading: false,
});
</script>
