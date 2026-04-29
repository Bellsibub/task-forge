import IconCheck from '@/assets/icon-check.svg?react';
import { cn } from '@/lib/utils';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Label } from 'radix-ui';

type CheckboxProps = {
    id: string;
    label: string;
} & React.HTMLAttributes<HTMLDivElement> &
    CheckboxPrimitive.CheckboxProps;

const Checkbox = ({ id, label, className, ...props }: CheckboxProps) => {
    return (
        <Label.Root
            htmlFor={id}
            className={cn(
                'bg-bg-light dark:bg-bg-dark flex items-center h-10 p-3 gap-4 rounded-sm cursor-pointer hover:bg-primary/25 transition-colors duration-300 ease-in-out',
                className,
            )}
        >
            <CheckboxPrimitive.Root
                id={id}
                className="peer size-4 border border-mediumgrey/25 rounded-xs flex items-center justify-center data-[state=checked]:bg-primary dark:bg-darkgrey"
                {...props}
            >
                <CheckboxPrimitive.CheckboxIndicator className='text-white'>
                    <IconCheck />
                </CheckboxPrimitive.CheckboxIndicator>
            </CheckboxPrimitive.Root>
            <span className="text-xs text-black dark:text-white font-bold peer-data-[state=checked]:opacity-50 peer-data-[state=checked]:line-through">{label}</span>
        </Label.Root>
    );
};

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };