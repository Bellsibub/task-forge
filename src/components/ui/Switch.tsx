import { Switch as RadixSwitch } from 'radix-ui';
import type { ComponentProps } from 'react';

export type SwitchProps = {} & ComponentProps<typeof RadixSwitch.Root>;

export const Switch = ({ ...props }: SwitchProps) => {
    return (
        <RadixSwitch.Root
            className="w-10 py-0.75 bg-primary rounded-full relative cursor-pointer transition-colors duration-200"
            {...props}
        >
            <RadixSwitch.Thumb className="block size-4 bg-white rounded-full translate-x-0.75 transition-transform duration-200 data-[state=checked]:translate-x-5.25" />
        </RadixSwitch.Root>
    );
};

Switch.displayName = 'Switch';
