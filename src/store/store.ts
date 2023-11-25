import { defineStore} from "pinia";

export const useTaskStore = defineStore('tasks', {
    state: () => {
        return {isDragging: false}
    },
    actions: {
        sort(oldIndex: number, newIndex: number){}
    }
})