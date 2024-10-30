export const spaces = [
  {
    id: "1",
    title: "Project Alpha",
    description: "A project to develop a new web application",
    background: "blue",
    workspaceId: "workspace_123",
    createdBy: "Alice Brown",
    lists: [
      {
        id: "1",
        title: "Backlog",
        color: "lightgray",
        tasks: [
          {
            id: "1",
            title: "Setup Task",
            description: "Initial setup for the project",
            assignedTo: ["David Clark", "Emma Harris"],
            dueDate: "2024-10-20",
            priority: "High",
            createdBy: "Alice Brown",
            createdAt: "2024-10-01",
            updatedAt: "2024-10-01",
          },
          {
            id: "2",
            title: "Documentation Task",
            description: "Create project documentation",
            assignedTo: ["Alice Brown"],
            dueDate: "2024-10-25",
            priority: "Medium",
            createdBy: "David Clark",
            createdAt: "2024-10-02",
            updatedAt: "2024-10-04",
          },
        ],
      },
      {
        id: "2",
        title: "In Progress",
        color: "yellow",
        tasks: [
          {
            id: "3",
            title: "Authentication Task",
            description: "Implement authentication module",
            assignedTo: ["Emma Harris"],
            dueDate: "2024-10-22",
            priority: "High",
            createdBy: "David Clark",
            createdAt: "2024-10-05",
            updatedAt: "2024-10-06",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Project Beta",
    description: "E-commerce platform development",
    background: "green",
    workspaceId: "workspace_456",
    createdBy: "Michael Lee",
    lists: [
      {
        id: "1",
        title: "To Do",
        color: "red",
        tasks: [
          {
            id: "1",
            title: "Landing Page Task",
            description: "Build landing page",
            assignedTo: ["Sarah Green", "Paul Adams"],
            dueDate: "2024-10-18",
            priority: "High",
            createdBy: "Michael Lee",
            createdAt: "2024-10-01",
            updatedAt: "2024-10-01",
          },
          {
            id: "2",
            title: "Payment Integration Task",
            description: "Integrate payment gateway",
            assignedTo: ["Paul Adams"],
            dueDate: "2024-10-25",
            priority: "Medium",
            createdBy: "Sarah Green",
            createdAt: "2024-10-03",
            updatedAt: "2024-10-05",
          },
        ],
      },
      {
        id: "2",
        title: "Done",
        color: "green",
        tasks: [
          {
            id: "3",
            title: "User Profile Task",
            description: "Create user profiles",
            assignedTo: ["Paul Adams"],
            dueDate: "2024-10-10",
            priority: "Low",
            createdBy: "Michael Lee",
            createdAt: "2024-09-30",
            updatedAt: "2024-10-10",
          },
        ],
      },
    ],
  },
];

export const sections = [
  { title: "To Do", id: "to-do", color: "#F9C86A" },
  { title: "In Progress", id: "in-progress", color: "#EF9033" },
  { title: "Done", id: "done", color: "#96C18B" },
];

export const tasksData = [
  { id: "task-1", content: "Task 1", section: "to-do", color: "#F9C86A" },
  { id: "task-2", content: "Task 2", section: "in-progress", color: "#EF9033" },
  { id: "task-3", content: "Task 3", section: "done", color: "#96C18B" },
  { id: "task-4", content: "Task 4", section: "to-do", color: "#F9C86A" },
];

export const colors = {
  blue1: {
    name: "Green Blue",
    hex: "#2364AA",
  },
  blue2: {
    name: "Picton Blue",
    hex: "#3DA5D9",
  },
  green1: {
    name: "Verdigris",
    hex: "#4CAF50",
  },
  green2: {
    name: "Olivine",
    hex: "#96C18B",
  },
  yellow1: {
    name: "Jasmine",
    hex: "#FEE485",
  },
  yellow2: {
    name: "Saffron",
    hex: "#F9C86A",
  },
  orange1: {
    name: "Carrot",
    hex: "#EF9033",
  },
};
