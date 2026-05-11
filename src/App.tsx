import { BoardDialog } from '@/components/dialogs/BoardDialog';
import { DeleteBoard } from '@/components/dialogs/DeleteBoard';
import { DeleteTask } from '@/components/dialogs/DeleteTask';
import { TaskDialog } from '@/components/dialogs/TaskDialog';
import { ViewTask } from '@/components/dialogs/ViewTask';
import { Board } from '@/components/layout/Board';
import { NoBoards } from '@/components/layout/Empties';
import { Navbar } from '@/components/layout/Navbar';
import { appStore } from '@/lib/store/app';
import type { Board as BoardType } from '@/lib/types';

function App() {
    const { boards, getActiveBoard } = appStore((state) => state);
    return (
        <div>
            <Navbar />
            {boards.length ? (
                <Board data={getActiveBoard() as BoardType} />
            ) : (
                <NoBoards />
            )}
            <BoardDialog mode="create" />
            <BoardDialog mode="edit" />
            <DeleteBoard />
            <TaskDialog mode="create" />
            <TaskDialog mode="edit" />
            <ViewTask />
            <DeleteTask />
        </div>
    );
}

export default App;
