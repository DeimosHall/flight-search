export interface Todo {
  id: number;
  text: string;
  dueDate?: string;  // Optional
  done?: boolean;
  doneDate?: string; // Optional
  priority: string;
  creationDate: string;
}

export interface TodosFilterAttributes {
  page: number;
  size: number;
  sortBy: string;
  sortOrder: string;
  done: boolean | null;
  text: string;
  priority: string;
}

export interface TodosMetrics {
  pages: number;
  avgTime: number;
  avgTimeLow: number;
  avgTimeMedium: number;
  avgTimeHigh: number;
}