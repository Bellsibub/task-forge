import IconCross from '@/assets/icon-cross.svg?react';
import { Button } from '@/components/ui/Button';
import { ColorPopover } from '@/components/ui/ColorPopover';
import { Label } from 'radix-ui';
import {
    type ArrayPath,
    type Control,
    Controller,
    type FieldValues,
    type Path,
    useFieldArray,
} from 'react-hook-form';

interface MultiCreateProps<
    TFieldValues extends FieldValues,
    TName extends ArrayPath<TFieldValues>,
> {
    label: string;
    name: TName;
    control: Control<TFieldValues>;
    placeholder?: string;
    fieldKey: string; // "name" for columns, "title" for subtasks
    colorKey?: string;
    addLabel?: string; // defaults to "+ Add New Item"
}

const MultiCreate = <
    TFieldValues extends FieldValues,
    TName extends ArrayPath<TFieldValues>,
>({
    label,
    name,
    placeholder,
    control,
    fieldKey,
    colorKey,
    addLabel,
}: MultiCreateProps<TFieldValues, TName>) => {
    const { fields, append, update } = useFieldArray({ control, name });

    const handleNewColumn = () => {
        append({
            [fieldKey]: '',
            id: crypto.randomUUID(),
            ...(colorKey && { [colorKey]: 'primary' }),
        } as Parameters<typeof append>[0]);
    };

    return (
        <div className="flex flex-col gap-4">
            <Label.Root
                className="text-xs text-mediumgrey font-bold"
                htmlFor={name}
            >
                {label}
            </Label.Root>
            {fields.map((field, index) => (
                <div key={field.id} className="relative inline-flex">
                    {colorKey && (
                        <ColorPopover
                            value={
                                (field as Record<string, unknown>)[colorKey] as
                                    | string
                                    | undefined
                            }
                            onChange={(color) => {
                                update(index, {
                                    ...(field as Record<string, unknown>),
                                    [colorKey]: color,
                                } as Parameters<typeof update>[1]);
                            }}
                        />
                    )}
                    <Controller
                        name={
                            `${name}.${index}.${fieldKey}` as Path<TFieldValues>
                        }
                        control={control}
                        render={({ field }) => (
                            <input
                                className="w-full border border-mediumgrey/25 rounded-sm h-10 px-4 body-lg text-black dark:text-white focus:outline-none"
                                autoComplete="off"
                                placeholder={placeholder}
                                {...field}
                            />
                        )}
                    />
                    <Button size="sm" variant="ghost" className="pr-0">
                        <IconCross />
                    </Button>
                </div>
            ))}
            <Button variant="secondary" type="button" onClick={handleNewColumn}>
                {addLabel ?? '+ Add New Item'}
            </Button>
        </div>
    );
};

MultiCreate.displayName = 'MultiCreate';

export { MultiCreate };
export type { MultiCreateProps };
