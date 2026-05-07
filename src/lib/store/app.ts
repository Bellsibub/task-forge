import type { Board, Task } from '@/lib/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface AppState {
    boards: Board[];
    activeBoardId: string | null;

    setActiveBoard: (boardId: string) => void;
    getActiveBoard: () => Board | undefined;

    activeTask: Task | null;
    setActiveTask: (task: Task) => void;

    // Board CRUD operations
    createBoard: (board: Board) => void;
    readBoard: (boardId: string) => Board | undefined;
    updateBoard: (board: Board) => void;
    deleteBoard: (boardId: string) => void;

    // Task CRUD operations
    createTask: (task: Task, boardId: string) => void;
    updateTaskStatus: (
        taskId: string,
        columnId: string,
        boardId: string,
    ) => void;
    completeSubTask: (
        taskId: string,
        subTaskId: string,
        isCompleted: boolean,
        boardId: string,
    ) => void;
    editTask: (task: Task, boardId: string) => void;
    deleteTask: (taskId: string, boardId: string) => void;
}

export const appStore = create<AppState>()(
    devtools(
        immer((set, get) => ({
            boards: [],
            activeBoardId: null,

            setActiveBoard: (boardId) =>
                set((state) => {
                    state.activeBoardId = boardId;
                }),

            getActiveBoard: () =>
                get().boards.find((board) => board.id === get().activeBoardId),

            activeTask: null,
            setActiveTask: (task) =>
                set((state) => {
                    state.activeTask = task;
                }),

            // Board CRUD operations
            createBoard: (board) =>
                set((state) => {
                    state.boards.push(board);
                    state.activeBoardId = board.id;
                }),
            readBoard: (boardId) =>
                get().boards.find((board) => board.id === boardId),
            updateBoard: (board) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (b) => b.id === board.id,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    state.boards[boardIndex] = board;
                }),
            deleteBoard: (boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    state.boards.splice(boardIndex, 1);
                    state.activeBoardId =
                        state.boards.length > 0 ? state.boards[0].id : null;
                }),
            // Task CRUD operations
            createTask: (task, boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    const columnIndex = state.boards[
                        boardIndex
                    ].columns?.findIndex(
                        (column) => column.id === task.columnId,
                    );
                    if (columnIndex === -1 || columnIndex === undefined)
                        throw new Error('Column not found');
                    const column =
                        state.boards[boardIndex].columns![columnIndex];
                    if (!column.tasks) column.tasks = [];
                    column.tasks.push(task);
                }),
            updateTaskStatus: (taskId, columnId, boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    const sourceColumnIndex = state.boards[
                        boardIndex
                    ].columns?.findIndex((column) =>
                        column.tasks?.some((task) => task.id === taskId),
                    );
                    if (
                        sourceColumnIndex === -1 ||
                        sourceColumnIndex === undefined
                    )
                        throw new Error('Source column not found');
                    const sourceColumn =
                        state.boards[boardIndex].columns![sourceColumnIndex];
                    if (!sourceColumn.tasks) sourceColumn.tasks = [];
                    const taskIndex = sourceColumn.tasks.findIndex(
                        (task) => task.id === taskId,
                    );
                    if (taskIndex === -1) throw new Error('Task not found');
                    const task = sourceColumn.tasks[taskIndex];
                    sourceColumn.tasks.splice(taskIndex, 1);
                    const targetColumnIndex = state.boards[
                        boardIndex
                    ].columns?.findIndex((column) => column.id === columnId);
                    if (
                        targetColumnIndex === -1 ||
                        targetColumnIndex === undefined
                    )
                        throw new Error('Target column not found');
                    const targetColumn =
                        state.boards[boardIndex].columns![targetColumnIndex];
                    if (!targetColumn.tasks) targetColumn.tasks = [];
                    targetColumn.tasks.push(task);
                }),
            completeSubTask: (taskId, subTaskId, isCompleted, boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    const sourceColumnIndex = state.boards[
                        boardIndex
                    ].columns?.findIndex((column) =>
                        column.tasks?.some((task) => task.id === taskId),
                    );
                    if (
                        sourceColumnIndex === -1 ||
                        sourceColumnIndex === undefined
                    )
                        throw new Error('Source column not found');
                    const sourceColumn =
                        state.boards[boardIndex].columns![sourceColumnIndex];
                    if (!sourceColumn.tasks) sourceColumn.tasks = [];
                    const taskIndex = sourceColumn.tasks.findIndex(
                        (task) => task.id === taskId,
                    );
                    if (taskIndex === -1) throw new Error('Task not found');
                    const task = sourceColumn.tasks[taskIndex];
                    if (!task.subtasks) task.subtasks = [];
                    const subTaskIndex = task.subtasks.findIndex(
                        (subTask) => subTask.id === subTaskId,
                    );
                    if (subTaskIndex === -1)
                        throw new Error('Subtask not found');
                    task.subtasks[subTaskIndex].isCompleted = isCompleted;
                    if (
                        state.activeTask?.id === taskId &&
                        state.activeTask.subtasks
                    ) {
                        const activeSubTaskIndex =
                            state.activeTask.subtasks.findIndex(
                                (s) => s.id === subTaskId,
                            );
                        if (activeSubTaskIndex !== -1) {
                            state.activeTask.subtasks[
                                activeSubTaskIndex
                            ].isCompleted = isCompleted;
                        }
                    }
                }),
            editTask: (task, boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    const columns = state.boards[boardIndex].columns;
                    // Find the column that currently holds the task (not the target column)
                    const sourceColumnIndex = columns?.findIndex((column) =>
                        column.tasks?.some((t) => t.id === task.id),
                    );
                    if (sourceColumnIndex === -1 || sourceColumnIndex === undefined)
                        throw new Error('Task not found');
                    const sourceColumn = columns![sourceColumnIndex];
                    const taskIndex = sourceColumn.tasks!.findIndex(
                        (t) => t.id === task.id,
                    );
                    if (task.columnId === sourceColumn.id) {
                        // Same column — just update in place
                        sourceColumn.tasks![taskIndex] = task;
                    } else {
                        // Column changed — move the task
                        sourceColumn.tasks!.splice(taskIndex, 1);
                        const targetColumnIndex = columns!.findIndex(
                            (column) => column.id === task.columnId,
                        );
                        if (targetColumnIndex === -1)
                            throw new Error('Column not found');
                        const targetColumn = columns![targetColumnIndex];
                        if (!targetColumn.tasks) targetColumn.tasks = [];
                        targetColumn.tasks.push(task);
                    }
                    state.activeTask = task;
                }),
            deleteTask: (taskId, boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    const columnIndex = state.boards[
                        boardIndex
                    ].columns?.findIndex((column) =>
                        column.tasks?.some((task) => task.id === taskId),
                    );
                    if (
                        columnIndex === -1 ||
                        columnIndex === undefined
                    ) throw new Error('Column not found');
                    const column =
                        state.boards[boardIndex].columns![columnIndex];
                    if (!column.tasks) column.tasks = [];
                    const taskIndex = column.tasks.findIndex(
                        (task) => task.id === taskId,
                    );
                    if (taskIndex === -1) throw new Error('Task not found');
                    column.tasks.splice(taskIndex, 1);
                }),
        })),
    ),
);
