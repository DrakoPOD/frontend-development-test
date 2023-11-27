import type { ITask, ITaskStutus } from "@/types/task";
import { defineStore} from "pinia";
import { useStorage } from "@vueuse/core";
import { TaskStatus } from "@/types/task.enums";

type IUseStorage<T> = ReturnType<typeof useStorage<T>>

const sampleTasks: ITask[] = [
    {
      title: "Implement Authentication Functionality",
      description: "Develop the authentication system for the web application",
      assigned: "Juan Perez",
      tags: ["Development", "Security"],
      due: "2024-02-15",
      status: TaskStatus.TO_DO,
    },
    {
      title: "Create Main User Interface",
      description: "Design and develop the main user interface of the application",
      assigned: "Maria Gomez",
      tags: ["Design", "Frontend"],
      due: "2024-03-01",
      status: TaskStatus.TO_DO,
    },
    {
      title: "Optimize Database Performance",
      description: "Make adjustments to improve query performance in the database",
      assigned: "Carlos Rodriguez",
      tags: ["Database", "Performance"],
      due: "2024-02-28",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      title: "Develop REST API for User Module",
      description: "Implement necessary routes and controllers to manage users through a REST API",
      assigned: "Ana Martinez",
      tags: ["Development", "Backend"],
      due: "2024-03-15",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      title: "Review and Fix Current Version Errors",
      description: "Conduct a thorough code review to identify and fix potential errors in the current software version",
      assigned: "Luisa Sanchez",
      tags: ["Quality", "Maintenance"],
      due: "2024-02-20",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      title: "Publish Version 1.0.0",
      description: "Perform final tests and proceed with the publication of version 1.0.0 of the software",
      assigned: "Development Team",
      tags: ["Deployment", "Versioning"],
      due: "2024-03-05",
      status: TaskStatus.DONE,
    },
  ].map(x=> ({...x}));

export const useTaskStore = defineStore('tasks', {
    state: (): {tasks: IUseStorage<ITask[]>} => {
        return {
            tasks: useStorage<ITask[]>('TASK_LIST', sampleTasks, localStorage)
        }
    },
    actions: {
        sortTask(oldIndex: any, newIndex: number, newStatus: number){
          if(oldIndex == newIndex && this.tasks[oldIndex].status == newStatus) return
          const task = this.tasks.splice(oldIndex,1)[0]

          task.status = newStatus as ITaskStutus

          this.tasks.splice(newIndex,0,task)
        }
    }
})