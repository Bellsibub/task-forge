import IconAdd from '@/assets/icon-add-task-mobile.svg?react';
import Logo from '@/assets/logo-mobile.svg?react';
import { Sidebar } from '@/components/dialogs/Sidebar';
import { BoardOptions } from '@/components/features/BoardOptions';
import { Button } from '@/components/ui';

type NavbarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Navbar = ({ ...props }: NavbarProps) => {
    return (
        <nav
            className="bg-white h-16 flex items-center justify-between"
            {...props}
        >
            <div className="flex items-center pl-4">
                <Logo className="shrink-0" />
                <Sidebar className="block" />
            </div>
            <div className="flex items-center gap-2">
                <Button className='w-12 h-8 p-0'>
                    <IconAdd />
                </Button>
                <BoardOptions />
            </div>
        </nav>
    );
};

Navbar.displayName = 'Navbar';
