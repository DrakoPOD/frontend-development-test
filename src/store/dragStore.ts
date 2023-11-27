import { defineStore } from "pinia";
import { ref } from "vue";

export const useDragStore = defineStore('drag',() => {
    const isDragging = ref(false)
    const dragIdx = ref<number | null>(null)

    return {isDragging, dragIdx}
})