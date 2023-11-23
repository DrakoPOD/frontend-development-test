import moment from 'moment'

import type { ITask } from "@/types/task";
import { TaskStatus } from "@/enums/task";

export const sampleTask: ITask = {
    title: 'Example Task',
    descriprion: 'This is a sample task for dev',
    status: TaskStatus.IN_PROGRESS,
    tags: ['Ama', 'Casa', 'Pedro'],
    asingned: 'Willy Malboa',
    due: moment().format('YYYY-MM-DD')
}