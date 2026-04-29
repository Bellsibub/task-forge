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
                <Button variant='ghost'>
                    <span className='heading-lg'>Current board name</span>
                    {open ? <IconChevronUp /> : <IconChevronDown />}
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/50 fixed inset-0 animate-fade-in top-16' />
                <Dialog.Content className='bg-white rounded-lg fixed p-6 w-full max-w-66 mt-4 left-1/2 -translate-x-1/2 animate-content-show'>
                    <Dialog.Title />
                    <Dialog.Description />
                    <Dialog.Close />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

Sidebar.displayName = 'Sidebar';
