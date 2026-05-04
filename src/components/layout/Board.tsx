import { Column } from '@/components/layout/Column';
import { Button } from '@/components/ui';

type BoardProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Board = ({ ...props }: BoardProps) => {
    const isEmpty = false; // Placeholder for actual logic to determine if the board is empty

    if (isEmpty) {
        return (
            <main
                className="flex items-center justify-center h-[calc(100vh-88px)] px-4"
                {...props}
            >
                <div
                    className="flex flex-col gap-6.25 items-center text-center"
                    {...props}
                >
                    <h2 className="heading-lg text-mediumgrey">
                        This board is empty. Create a new column to get started.
                    </h2>
                    <Button>+ Add New Column</Button>
                </div>
            </main>
        );
    }
    return (
        <main
            className="mt-6 ml-4 overflow-auto h-[calc(100vh-88px)]"
            {...props}
        >
            <div className="grid grid-flow-col auto-cols-[280px]" {...props}>
                <Column />
                <Column />
                <Column />
            </div>
        </main>
    );
};

Board.displayName = 'Board';
