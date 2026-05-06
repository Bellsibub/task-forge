import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
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
}

export const uiStore = create<UIState>()(
    devtools(
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
        })),
    ),
);
