import { Column } from '@/components/layout/Column';
import { NoColumns } from '@/components/layout/Empties';
import type { Board as BoardType } from '@/lib/types';

type BoardProps = { data: BoardType } & React.HTMLAttributes<HTMLDivElement>;

export const Board = ({ data, ...props }: BoardProps) => {
    if (data.columns?.length === 0) {
        return <NoColumns />;
    }
    return (
        <main
            className="mt-6 ml-4 overflow-auto h-[calc(100vh-88px)]"
            {...props}
        >
            <div className="grid grid-flow-col auto-cols-[280px]" {...props}>
                {data.columns?.map((column) => (
                    <Column key={column.id} data={column} />
                ))}
            </div>
        </main>
    );
};

Board.displayName = 'Board';
