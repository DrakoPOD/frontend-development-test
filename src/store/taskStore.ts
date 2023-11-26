import type { ITask } from "@/types/task";
import { defineStore} from "pinia";

export const useTaskStore = defineStore('tasks', {
    state: (): {tasks: ITask[]} => {
        return {
            tasks: []
        }
    },
    actions: {
        sort(oldIndex: number, newIndex: number){}
    }
})