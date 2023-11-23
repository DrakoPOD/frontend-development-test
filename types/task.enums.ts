import { ITaskStutus } from "./task"

export const TaskStatus = {
    TO_DO: 0,
    IN_PROGRESS: 1,
    DONE: 2
} as const

export const TaskStatusNames: { readonly [key in ITaskStutus]: string } = {
    0: 'To Do',
    1: 'In Progress',
    2: 'Done'
}