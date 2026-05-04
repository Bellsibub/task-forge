import IconChevronDown from '@/assets/icon-chevron-down.svg?react';
import IconChevronUp from '@/assets/icon-chevron-up.svg?react';
import { Button } from '@/components/ui';
import { Dialog } from 'radix-ui';
import { useState } from 'react';

type SidebarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ ...props }: SidebarProps) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
            <Dialog.Trigger asChild>
                <Button variant="ghost" className="min-w-0 max-w-full">
                    <span className="heading-lg truncate">
                        Current board name
                    </span>
                    {open ? (
                        <IconChevronUp className="shrink-0" />
                    ) : (
                        <IconChevronDown className="shrink-0" />
                    )}
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                <Dialog.Content className="bg-white rounded-lg fixed p-6 w-full max-w-66 top-16 mt-4 left-1/2 -translate-x-1/2 animate-content-show z-20">
                    <Dialog.Title />
                    <Dialog.Description />
                    <Dialog.Close />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

Sidebar.displayName = 'Sidebar';
