import type { Board } from '@/lib/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface AppState {
    boards: Board[];
    activeBoardId: string | null;

    setActiveBoard: (boardId: string) => void;
    getActiveBoard: () => Board | undefined;

    // Board CRUD operations
    createBoard: (board: Board) => void;
    readBoard: (boardId: string) => Board | undefined;
    updateBoard: (board: Board) => void;
    deleteBoard: (boardId: string) => void;
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
                    state.activeBoardId = state.boards.length > 0 ? state.boards[0].id : null;
                }),
        })),
    ),
);
