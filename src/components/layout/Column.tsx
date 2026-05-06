/* eslint-disable react-refresh/only-export-components */
import { Task } from '@/components/layout/Task';
import { Button } from '@/components/ui';
import { uiStore } from '@/lib/store/ui';
import type { Column as ColumnType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const ColumnVariants = cva('block', {
    variants: {
        variant: {
            primary: 'bg-primary',
            accent: 'bg-accent',
            destructive: 'bg-destructive',
            mediumgrey: 'bg-mediumgrey',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

const ColumnHeader = ({
    title,
    count,
    variant,
}: VariantProps<typeof ColumnVariants> & { title: string, count: number }) => {
    return (
        <div className="flex items-center gap-3">
            <div
                className={cn(
                    'size-3.75 rounded-full',
                    ColumnVariants({ variant }),
                )}
            />
            <h4 className="heading-sm uppercase">
                {title} ({count})
            </h4>
        </div>
    );
};

type ColumnProps = React.ComponentProps<'div'> & {
    data: ColumnType;
};

export const Column = ({ data, ...props }: ColumnProps) => {
    const { setOpenCreateTask } = uiStore((state) => state);
    return (
        <div {...props}>
            <ColumnHeader variant={data.color} title={data.name} count={data.tasks?.length || 0} />
            <div className="mt-4 flex flex-col gap-4">
                {data.tasks?.map((task) => (
                    <Task key={task.id} data={task} />
                ))}
                <Button
                    variant="ghost"
                    onClick={() => setOpenCreateTask(true, data.id)}
                    className="rounded-lg text-mediumgrey bg-linear-to-r from-[#E9EFFA] to-[#E9EFFA]/50 hover:drop-shadow-lg hover:drop-shadow-shadow"
                >
                    + Add New Task
                </Button>
            </div>
        </div>
    );
};

Column.displayName = 'Column';
