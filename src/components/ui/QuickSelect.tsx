import ChevronDown from '@/assets/icon-chevron-down.svg?react';
import { cn } from '@/lib/utils';
import * as RadixSelect from '@radix-ui/react-select';
import { Label } from 'radix-ui';
import { type ComponentProps, useState } from 'react';
// import {
//     type Control,
//     Controller,
//     type FieldPath,
//     type FieldValues,
// } from 'react-hook-form';

type QuickSelectProps = {
    label: string;
    options: Array<{ value: string; label: string }>;
} & ComponentProps<typeof RadixSelect.Root>;

const QuickSelect = ({ label, options, ...props }: QuickSelectProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col gap-2">
            <Label.Root
                className="text-xs text-mediumgrey font-bold"
                // htmlFor={name}
            >
                {label}
            </Label.Root>
            <RadixSelect.Root
                open={open}
                onOpenChange={() => setOpen(!open)}
                // onValueChange={field.onChange}
                // defaultValue={field.value}
                {...props}
            >
                <RadixSelect.Trigger
                    className={cn(
                        'w-full border border-mediumgrey/25 rounded-sm h-10 px-4 body-lg text-black dark:text-white focus:outline-none flex items-center justify-between cursor-pointer hover:border-primary ',
                        open && 'border-primary',
                    )}
                >
                    <RadixSelect.Value />
                    <RadixSelect.Icon>
                        <ChevronDown className=" text-primary" />
                    </RadixSelect.Icon>
                </RadixSelect.Trigger>
                <RadixSelect.Portal>
                    <RadixSelect.Content
                        position="popper"
                        align="center"
                        sideOffset={4}
                        className="w-(--radix-select-trigger-width) z-30"
                    >
                        <RadixSelect.Viewport className="bg-white dark:bg-bg-dark rounded-sm p-2">
                            {options.map((item) => (
                                <RadixSelect.Item
                                    className="p-2 rounded-sm cursor-pointer hover:bg-primary/25 transition-colors duration-300 ease-in-out focus:outline-none body-lg text-mediumgrey hover:text-primary dark:hover:text-white"
                                    key={item.value}
                                    value={item.value}
                                >
                                    <RadixSelect.ItemText>
                                        {item.label}
                                    </RadixSelect.ItemText>
                                </RadixSelect.Item>
                            ))}
                        </RadixSelect.Viewport>
                    </RadixSelect.Content>
                </RadixSelect.Portal>
            </RadixSelect.Root>
        </div>
    );
};

QuickSelect.displayName = 'QuickSelect';

export { QuickSelect };
export type { QuickSelectProps };
