import { Column } from '@/components/layout/Column';
import { NoColumns } from '@/components/layout/Empties';
import { Button } from '@/components/ui';
import { uiStore } from '@/lib/store/ui';
import type { Board as BoardType } from '@/lib/types';

type BoardProps = { data: BoardType } & React.HTMLAttributes<HTMLDivElement>;

export const Board = ({ data, ...props }: BoardProps) => {
    const { setOpenEditBoard } = uiStore((state) => state);
    if (data.columns?.length === 0) {
        return <NoColumns />;
    }
    return (
        <main
            className="mt-6 ml-4 overflow-auto h-[calc(100vh-138px)]"
            {...props}
        >
            <div
                className="grid grid-flow-col auto-cols-[280px] gap-6 h-full"
                {...props}
            >
                {data.columns?.map((column) => (
                    <Column key={column.id} data={column} />
                ))}
                <Button
                    variant="ghost"
                    size="xl"
                    className="h-full rounded-lg text-mediumgrey bg-linear-to-r from-[#E9EFFA] to-[#E9EFFA]/50"
                    onClick={() => setOpenEditBoard(true)}
                >
                    + New Column
                </Button>
            </div>
        </main>
    );
};

Board.displayName = 'Board';
