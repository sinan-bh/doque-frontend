export type Space = {
  _id: string;
  name: string;
  description: string;
  workspace: string;
  createdBy: string;
  lists: List[];
  createdAt: string;
  updatedAt: string;
};

export type List = {
  _id: string;
  name: string;
  color?: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  assignedTo: string[];
  dueDate?: string;
  priority?: string;
  listId: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  color?: string;
};

export type TaskRow = {
  id: string;
  column: string;
  title: string;
  description: string | undefined;
  assignedTo?: string[];
  dueDate?: string;
  priority?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  color?: string;
  status?: string;
};

export type Column = {
  id: string;
  title: string;
  color?: string;
  task?: TaskRow[];
};

export type TaskFormValues = {
  title?: string;
  description?: string;
  assignedTo?: string[];
  dueDate?: string;
  priority?: string;
  listId?: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type Member = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  image: string;
};

export type coverColor = { name: string; hex: string };
