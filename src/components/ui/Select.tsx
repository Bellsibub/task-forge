import ChevronDown from '@/assets/icon-chevron-down.svg?react';
import { cn } from '@/lib/utils';
import * as RadixSelect from '@radix-ui/react-select';
import { Label } from 'radix-ui';
import { useState } from 'react';
import {
    type Control,
    Controller,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

interface SelectProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> {
    label: string;
    name: TName;
    control: Control<TFieldValues>;
    options: Array<{ value: string; label: string }>;
}

const Select = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    label,
    name,
    control,
    options,
    ...props
}: SelectProps<TFieldValues, TName>) => {
    const [open, setOpen] = useState(false);
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-2">
                    <Label.Root
                        className="text-xs text-mediumgrey font-bold"
                        htmlFor={name}
                    >
                        {label}
                    </Label.Root>
                    <RadixSelect.Root
                        open={open}
                        onOpenChange={() => setOpen(!open)}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...props}
                    >
                        <RadixSelect.Trigger
                            className={cn(
                                'w-full border border-mediumgrey/25 rounded-sm h-10 px-4 body-lg text-black dark:text-white focus:outline-none flex items-center justify-between cursor-pointer hover:border-primary ',
                                'transition-colors duration-500 ease-in-out',
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
                                            className="p-2 rounded-sm cursor-pointer hover:bg-primary/25 transition-colors duration-500 ease-in-out focus:outline-none body-lg text-mediumgrey hover:text-primary dark:hover:text-white"
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
            )}
        />
    );
};

Select.displayName = 'Select';

export { Select };
export type { SelectProps };
