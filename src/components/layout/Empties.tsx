import { Button } from '@/components/ui';
import testData from '@/data.json';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Board } from '@/lib/types';

export const NoBoards = ({
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const setOpenCreateBoard = uiStore((state) => state.setOpenCreateBoard);
    const seedData = appStore((state) => state.seedData);

    return (
        <main {...props}>
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
                <span>or</span>
                <Button
                    variant="secondary"
                    onClick={() => seedData(testData.boards as Board[])}
                >
                    Seed with test data
                </Button>
            </div>
        </main>
    );
};

NoBoards.displayName = 'NoBoards';

export const NoColumns = ({
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const setOpenEditBoard = uiStore((state) => state.setOpenEditBoard);
    return (
        <main {...props}>
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
    );
};

NoColumns.displayName = 'NoColumns';
