import { Label } from 'radix-ui';
import {
    type Control,
    Controller,
    type FieldPath,
    type FieldValues,
    type RegisterOptions,
    useFormState,
} from 'react-hook-form';

interface InputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> {
    label: string;
    name: TName;
    placeholder?: string;
    control: Control<TFieldValues>;
    rules?:
        | Omit<
              RegisterOptions<TFieldValues, TName>,
              'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
          >
        | undefined;
}

const Input = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    label,
    name,
    placeholder,
    control,
    rules,
    ...props
}: InputProps<TFieldValues, TName>) => {
    const { errors } = useFormState({ control, name });
    return (
        <Controller
            rules={rules}
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
                    <div className="relative">
                        <input
                            data-invalid={!!errors[name]}
                            className="w-full border border-mediumgrey/25 rounded-sm h-10 px-4 body-lg text-black focus:outline-none data-[invalid=true]:border-destructive"
                            placeholder={placeholder}
                            {...field}
                        />
                        {errors[name] && (
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-destructive body-lg"
                            >
                                {errors[name]?.message?.toString()}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {...props}
        />
    );
};

Input.displayName = 'Input';

export { Input };
export type { InputProps };
