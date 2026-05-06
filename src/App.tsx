import { CreateBoard } from '@/components/dialogs/CreateBoard';
import { DeleteBoard } from '@/components/dialogs/DeleteBoard';
import { EditBoard } from '@/components/dialogs/EditBoard';
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
            <CreateBoard />
            <EditBoard />
            <DeleteBoard />
        </div>
    );
}

export default App;
