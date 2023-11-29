import { defineStore } from "pinia";
import { ref } from "vue";
import { useTaskStore } from "./taskStore";

import type { ITask, ITaskStutus } from "@/types/task";

export const useDragStore = defineStore("drag", () => {
  const taskStore = useTaskStore()

  const isDragging = ref(false);
  const dragIdx = ref<number | null>(null);
  const currentColumn = ref<number | null>(null);
  const dragList = ref<number[] | null>(null);

  const cleanDrag = () =>{
    isDragging.value = false
    dragIdx.value = null
    currentColumn.value = null
    dragList.value = null
  }

  const sortIndexTask = (oldIndex: number |undefined, newIndex: number | undefined) =>{
    if (newIndex == undefined || oldIndex == undefined) return;
    if (oldIndex == newIndex) return;
    const task = taskStore.tasks.splice(oldIndex, 1)[0];
    taskStore.tasks.splice(newIndex, 0, task);
  }

  const sortTask = (oldIndex: number, newIndex: number, newStatus: number) => {
    if (dragList.value == null || dragList.value.length == 0){
      if (oldIndex == newIndex && taskStore.tasks[oldIndex].status == newStatus)
      return;
    const task = taskStore.tasks.splice(oldIndex, 1)[0];
    
    task.status = newStatus as ITaskStutus;
    
    taskStore.tasks.splice(newIndex, 0, task);
  }else {
    if(currentColumn.value == newStatus) return
    const tempArr: ITask[] = []
    dragList.value.sort((a,b)=> b-a)
    dragList.value.forEach(idx=> {
      const tempTask = taskStore.tasks.splice(idx,1)[0]
      tempTask.status = newStatus as ITaskStutus
      tempArr.push(tempTask)
    })
    tempArr.reverse()
    taskStore.tasks.splice(newIndex,0, ...tempArr)
  }
  cleanDrag()
}

  return { isDragging, dragIdx, currentColumn, dragList, sortIndexTask, sortTask, cleanDrag };
});
