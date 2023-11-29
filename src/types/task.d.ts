import { TaskStatus } from "./task.enums";

export type ITaskStutus = typeof TaskStatus[keyof typeof TaskStatus];

export interface ITask {
    title: string;
    description: string;
    assigned: string;
    tags: string[];
    due: Date | string | null;
    status: ITaskStutus;
    id?: string;
}