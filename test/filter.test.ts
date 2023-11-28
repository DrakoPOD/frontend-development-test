import { test, describe, expect } from "vitest";
import { samplePokemonTasks } from "@/utils/samples";
import { filterTask } from "@/utils/utilFuncs";

describe("Filter Taks", () => {
  // There is 2 task with pikachu in the title
  test("Filter by title", () => {
    const tasks = filterTask(samplePokemonTasks, "pikachu");

    expect(tasks).toHaveLength(2);
  });

  // Just one task is asigned to Red, search is case insensitive
  test("Filter by assigned", () => {
    const tasks = filterTask(samplePokemonTasks, "RED");

    expect(tasks).toHaveLength(1);
  });

  // 3 tasks have "battles" in tags
  test("Filter by tag", () => {
    const tasks = filterTask(samplePokemonTasks, "Battles");

    expect(tasks).toHaveLength(3);
  });
});
