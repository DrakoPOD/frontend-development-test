import moment from 'moment'

import type { ITask } from "@/types/task";
import { TaskStatus } from "@/types/task.enums";

export const sampleTask: ITask = {
    title: 'Example Task',
    description: 'This is a sample task for dev',
    status: TaskStatus.IN_PROGRESS,
    tags: ['Ama', 'Casa', 'Pedro'],
    assigned: 'Willy Malboa',
    due: moment().format('MMM Do YY')
}