import { Button } from '@/components/ui';
import { uiStore } from '@/lib/store/ui';

export const NoBoards = () => {
    const setOpenCreateBoard = uiStore((state) => state.setOpenCreateBoard);

    return (
        <>
            <main className="flex items-center justify-center h-[calc(100vh-88px)] px-4">
                <div className="flex flex-col gap-6.25 items-center text-center">
                    <h2 className="heading-lg text-mediumgrey">
                        There are no boards. Create a new board to get started.
                    </h2>
                    <Button
                        className="min-w-0 max-w-full"
                        onClick={() => setOpenCreateBoard(true)}
                    >
                        + Add New Board
                    </Button>
                </div>
            </main>
        </>
    );
};

NoBoards.displayName = 'NoBoards';

export const NoColumns = () => {
    const setOpenEditBoard = uiStore((state) => state.setOpenEditBoard);
    return (
        <>
            <main className="flex items-center justify-center h-[calc(100vh-88px)] px-4">
                <div className="flex flex-col gap-6.25 items-center text-center">
                    <h2 className="heading-lg text-mediumgrey">
                        This board is empty. Create a new column to get started.
                    </h2>
                    <Button
                        className="min-w-0 max-w-full"
                        onClick={() => setOpenEditBoard(true)}
                    >
                        + Add New Column
                    </Button>
                </div>
            </main>
        </>
    );
};

NoColumns.displayName = 'NoColumns';
