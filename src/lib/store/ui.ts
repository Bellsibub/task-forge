import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface UIState {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    
    openEditBoard: boolean;
    setOpenEditBoard: (open: boolean) => void;
    
    openCreateBoard: boolean;
    setOpenCreateBoard: (open: boolean) => void;
    
    openDeleteBoard: boolean;
    setOpenDeleteBoard: (open: boolean) => void;

    openCreateTask: boolean;
    createTaskViaColumnId?: string;
    setOpenCreateTask: (open: boolean, viaId?: string) => void;

    openViewTask: boolean;
    setOpenViewTask: (open: boolean) => void;

    openEditTask: boolean;
    setOpenEditTask: (open: boolean) => void;

    openDeleteTask: boolean;
    setOpenDeleteTask: (open: boolean) => void;
}

export const uiStore = create<UIState>()(
    immer((set) => ({
        sidebarOpen: false,
        setSidebarOpen: (open) =>
            set((state) => {
                state.sidebarOpen = open;
            }),
        openEditBoard: false,
        setOpenEditBoard: (open) =>
            set((state) => {
                state.openEditBoard = open;
            }),
        openCreateBoard: false,
        setOpenCreateBoard: (open) =>
            set((state) => {
                state.openCreateBoard = open;
            }),
        openDeleteBoard: false,
        setOpenDeleteBoard: (open) =>
            set((state) => {
                state.openDeleteBoard = open;
            }),
        openCreateTask: false,
        createTaskViaColumnId: undefined,
        setOpenCreateTask: (open, viaId) =>
            set((state) => {
                state.openCreateTask = open;
                console.log(
                    'Setting openCreateTask to',
                    open,
                    'with viaId',
                    viaId,
                );
                state.createTaskViaColumnId = viaId || undefined;
            }),
        openViewTask: false,
        setOpenViewTask: (open) =>
            set((state) => {
                state.openViewTask = open;
            }),
        openEditTask: false,
        setOpenEditTask: (open) =>
            set((state) => {
                state.openEditTask = open;
            }),
        openDeleteTask: false,
        setOpenDeleteTask: (open) =>
            set((state) => {
                state.openDeleteTask = open;
            }),
    })),
);
