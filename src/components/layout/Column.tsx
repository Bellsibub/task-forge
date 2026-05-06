/* eslint-disable react-refresh/only-export-components */
import { Task } from '@/components/layout/Task';
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
    variant,
}: VariantProps<typeof ColumnVariants> & { title: string }) => {
    const count = 4; // Placeholder for actual logic to get the count of tasks in the column
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
    // const variant = 'default'; // Placeholder for actual logic to determine the variant of the column
    return (
        <div {...props}>
            <ColumnHeader variant={data.color} title={data.name} />
            <div className="mt-4 flex flex-col gap-4">
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    );
};

Column.displayName = 'Column';
