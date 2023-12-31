import { ITask } from "@/types/task";

export const filterTask = (taskList: ITask[], filterText: string = "") => {
  filterText = filterText.toLocaleLowerCase();

  if (filterText !== "" && filterText != null) {
    return taskList.filter(
      ( task ) =>
        task.title.toLocaleLowerCase().includes(filterText) ||
        // task.description.toLocaleLowerCase().includes(filterTest) ||
        task.assigned.toLocaleLowerCase().includes(filterText) ||
        task.tags.some((tag) => tag.toLocaleLowerCase().includes(filterText))
    );
  } else {
    return taskList;
  }
};
