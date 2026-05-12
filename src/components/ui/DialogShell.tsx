import { Dialog } from 'radix-ui';
import type { ComponentProps } from 'react';

export type DialogShellProps = {
    title?: string;
    titleChildren?: React.ReactNode;
    description?: string;
} & ComponentProps<typeof Dialog.Root>;

export const DialogShell = ({
    title,
    titleChildren,
    description,
    children,
    ...props
}: DialogShellProps) => {
    return (
        <Dialog.Root {...props}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in z-20" />
                <Dialog.Content className="bg-white dark:bg-darkgrey rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    {title && (
                        <Dialog.Title className="heading-lg flex items-center justify-between">
                            {title}
                            {titleChildren}
                        </Dialog.Title>
                    )}
                    {description && (
                        <Dialog.Description className="text-mediumgrey body-lg">
                            {description}
                        </Dialog.Description>
                    )}
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

DialogShell.displayName = 'DialogShell';
