import type { ITask } from "@/types/task";
import { defineStore} from "pinia";
import { useStorage } from "@vueuse/core";

type IUseStorage<T> = ReturnType<typeof useStorage<T>>

export const useTaskStore = defineStore('tasks', {
    state: (): {tasks: IUseStorage<ITask[]>} => {
        return {
            tasks: useStorage<ITask[]>('TASK_LIST', [], localStorage)
        }
    },
    actions: {
        sort(oldIndex: number, newIndex: number){}
    }
})