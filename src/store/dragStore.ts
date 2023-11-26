import { defineStore } from "pinia";

export const useDragStore = defineStore('drag', {
    state: () => {
        return {
            isDragging: false
        }
    }
})