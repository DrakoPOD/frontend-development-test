import moment from "moment";
import {v4 as uuidv4 } from 'uuid';

import type { ITask } from "@/types/task";
import { TaskStatus } from "@/types/task.enums";

export const sampleTask: ITask = {
  title: "Example Task",
  description: "This is a sample task for dev",
  status: TaskStatus.IN_PROGRESS,
  tags: ["Ama", "Casa", "Pedro"],
  assigned: "Willy Malboa",
  due: moment().format("MMM Do YY"),
  id: uuidv4()
};

export const sampleTasksList: ITask[] = [
  {
    title: "Implement Authentication Functionality",
    description: "Develop the authentication system for the web application",
    assigned: "Juan Perez",
    tags: ["Development", "Security"],
    due: "2024-02-15",
    status: TaskStatus.TO_DO,
    id: uuidv4()
  },
  {
    title: "Create Main User Interface",
    description:
      "Design and develop the main user interface of the application",
    assigned: "Maria Gomez",
    tags: ["Design", "Frontend"],
    due: "2024-03-01",
    status: TaskStatus.TO_DO,
    id: uuidv4()
  },
  {
    title: "Optimize Database Performance",
    description:
      "Make adjustments to improve query performance in the database",
    assigned: "Carlos Rodriguez",
    tags: ["Database", "Performance"],
    due: "2024-02-28",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Develop REST API for User Module",
    description:
      "Implement necessary routes and controllers to manage users through a REST API",
    assigned: "Ana Martinez",
    tags: ["Development", "Backend"],
    due: "2024-03-15",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Review and Fix Current Version Errors",
    description:
      "Conduct a thorough code review to identify and fix potential errors in the current software version",
    assigned: "Luisa Sanchez",
    tags: ["Quality", "Maintenance"],
    due: "2024-02-20",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Publish Version 1.0.0",
    description:
      "Perform final tests and proceed with the publication of version 1.0.0 of the software",
    assigned: "Development Team",
    tags: ["Deployment", "Versioning"],
    due: "2024-03-05",
    status: TaskStatus.DONE,
    id: uuidv4()
  },
].map((x) => ({ ...x }));

export const samplePokemonTasks = [
  {
    title: "Capture Pikachu",
    description:
      "Embark on a journey to capture Pikachu in the Viridian Forest",
    assigned: "Ash Ketchum",
    tags: ["Adventure", "Capture", "Pokemon"],
    due: "2023-02-15",
    status: TaskStatus.TO_DO,
    id: uuidv4()
  },
  {
    title: "Train Charmander for Battle",
    description:
      "Train Charmander to become a powerful Pokémon for upcoming battles",
    assigned: "Brock",
    tags: ["Training", "Battles", "Fire-type"],
    due: "2023-03-01",
    status: TaskStatus.TO_DO,
    id: uuidv4()
  },
  {
    title: "Explore Cerulean Cave for Rare Pokémon",
    description:
      "Embark on a journey to Cerulean Cave to discover and capture rare Pokémon",
    assigned: "Misty",
    tags: ["Exploration", "Rare Pokemon"],
    due: "2023-02-28",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Evolve Eevee into Vaporeon",
    description:
      "Use a Water Stone to evolve Eevee into the Water-type Pokémon Vaporeon",
    assigned: "May",
    tags: ["Evolution", "Water-type"],
    due: "2023-03-15",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Battle Team Rocket at the Pokemon Center",
    description:
      "Confront Team Rocket at the local Pokemon Center and protect the Pokémon",
    assigned: "James",
    tags: ["Battles", "Team Rocket"],
    due: "2023-02-20",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Complete the Pokémon League Challenge",
    description:
      "Face the Elite Four and become the Pokémon Champion by completing the League Challenge",
    assigned: "Trainer Red",
    tags: ["Champion Challenge", "Elite Four"],
    due: "2023-03-05",
    status: TaskStatus.DONE,
    id: uuidv4()
  },
  {
    title: "Attend Pokémon Battle Seminar",
    description:
      "Participate in a Pokémon battle seminar to enhance battling skills",
    assigned: "Ash Ketchum",
    tags: ["Training", "Battles"],
    due: "2023-02-18",
    status: TaskStatus.IN_PROGRESS,
    id: uuidv4()
  },
  {
    title: "Rescue Pikachu from Team Rocket",
    description:
      "Rescue Pikachu from the clutches of Team Rocket in the Viridian City",
    assigned: "Ash Ketchum",
    tags: ["Adventure", "Rescue", "Team Rocket"],
    due: "2023-02-25",
    status: TaskStatus.TO_DO,
    id: uuidv4()
  },
].map(x=>({...x}));
