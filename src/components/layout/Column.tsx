/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const ColumnVariants = cva('block', {
    variants: {
        variant: {
            default: 'bg-primary',
            accent: 'bg-accent',
            destructive: 'bg-destructive',
            muted: 'bg-mediumgrey',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const ColumnHeader = ({ variant }: VariantProps<typeof ColumnVariants>) => {
    const count = 4; // Placeholder for actual logic to get the count of tasks in the column
    return (
        <div className="flex items-center gap-3">
            <div
                className={cn(
                    'size-3.75 rounded-full',
                    ColumnVariants({ variant }),
                )}
            />
            <h4 className="heading-sm uppercase">Todo ({count})</h4>
        </div>
    );
};

export const Column = ({ ...props }: React.ComponentProps<'div'>) => {
    const variant = 'default'; // Placeholder for actual logic to determine the variant of the column
    return (
        <div {...props}>
            <ColumnHeader variant={variant} />
        </div>
    );
};

Column.displayName = 'Column';
