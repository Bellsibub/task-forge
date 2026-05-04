import { CreateBoard } from '@/components/dialogs/CreateBoard';
import { Button } from '@/components/ui';

export const NoBoards = () => {
    return (
        <main className="flex items-center justify-center h-[calc(100vh-88px)] px-4">
            <div className="flex flex-col gap-6.25 items-center text-center">
                <h2 className="heading-lg text-mediumgrey">
                    There are no boards. Create a new board to get started.
                </h2>
                <CreateBoard />
            </div>
        </main>
    );
};

NoBoards.displayName = 'NoBoards';

export const NoColumns = () => {
    return (
        <main className="flex items-center justify-center h-[calc(100vh-88px)] px-4">
            <div className="flex flex-col gap-6.25 items-center text-center">
                <h2 className="heading-lg text-mediumgrey">
                    This board is empty. Create a new column to get started.
                </h2>
                <Button>+ Add New Column</Button>
            </div>
        </main>
    );
};

NoColumns.displayName = 'NoColumns';
