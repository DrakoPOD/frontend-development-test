import { mount } from "@vue/test-utils";
import { test, describe, expect, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

import NewTask from "@/components/NewTask.vue";
import { useTaskStore } from "@/store/taskStore";

describe("Test Form", async () => {
  const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false });

  test("Add task", async () => {
    const taskStore = useTaskStore();
    taskStore.formMode = "add";

    // Clear default values of the store
    taskStore.tasks = [];

    const wrapper = mount(NewTask, {
      global: {
        plugins: [pinia],
      },
      props: {
        mode: "add",
      },
    });

    await wrapper.find('[data-test="inputTitle"]').setValue("New Task");

    await wrapper
      .find('[data-test="inputDescription"]')
      .setValue("This is an example description");

    const tagInput = wrapper.find('[data-test="inputTag"]');
    -(await tagInput.setValue("A tag"));
    await tagInput.trigger("keydown.Enter");
    await tagInput.setValue("Testing");
    await tagInput.trigger("keydown.Enter");

    await wrapper.find('[data-test="inputAssigned"]').setValue("Marco Antonio");

    await wrapper.find('[data-test="selectStatus"]').setValue("0");

    await wrapper.find('[data-test="inputDue"]').setValue("2024-02-14");

    await wrapper.find('button[type="submit"]').trigger("click");

    await wrapper.vm.$nextTick();

    expect(taskStore.tasks).toHaveLength(1);
  });

  test("Edit task", async () => {
    const taskStore = useTaskStore();
    taskStore.formMode = "edit";
    taskStore.idxTask = 0;
    taskStore.edittask = taskStore.tasks[0];

    const wrapper = mount(NewTask, {
      global: {
        plugins: [pinia],
      },
      props: {
        mode: "edit",
      },
    });

    await wrapper.find('[data-test="inputAssigned"]').setValue("Ana Maria");

    await wrapper.find('button[type="submit"]').trigger("click");

    await wrapper.vm.$nextTick();

    expect(taskStore.tasks[0].assigned).toBe("Ana Maria");
  });
});
