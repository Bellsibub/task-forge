export interface SubTask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface Task {
    id: string;
    title: string;
    description?: string | null;
    columnId: string;
    subtasks?: SubTask[] | null;
}

export interface Column {
    id: string;
    name: string;
    color: 'primary' | 'accent' | 'success' | 'destructive' | 'mediumgrey';
    tasks?: Task[] | null;
}

export interface Board {
    id: string;
    name: string;
    columns?: Column[] | null;
}
