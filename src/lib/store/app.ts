import type { Board, Column } from '@/lib/types';
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
    updateBoard: (
        boardId: string,
        boardName: string,
        columns: Column[],
    ) => void;
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
            updateBoard: (boardId, boardName, columns) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    state.boards[boardIndex].name = boardName;
                    state.boards[boardIndex].columns = columns;
                }),
            deleteBoard: (boardId) =>
                set((state) => {
                    const boardIndex = state.boards.findIndex(
                        (board) => board.id === boardId,
                    );
                    if (boardIndex === -1) throw new Error('Board not found');
                    state.boards.splice(boardIndex, 1);
                }),
        })),
    ),
);
