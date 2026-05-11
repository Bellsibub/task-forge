import IconAdd from '@/assets/icon-add-task-mobile.svg?react';
import Logo from '@/assets/logo-mobile.svg?react';
import { Sidebar } from '@/components/dialogs/Sidebar';
import { BoardOptions } from '@/components/dropdowns/BoardOptions';
import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';

type NavbarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Navbar = ({ ...props }: NavbarProps) => {
    const { getActiveBoard } = appStore((state) => state);
    const { setOpenCreateTask } = uiStore((state) => state);

    return (
        <nav
            className="bg-white h-16 flex items-center justify-between w-full sticky top-0 z-10"
            {...props}
        >
            <div className="flex items-center pl-4 min-w-0 overflow-hidden">
                <Logo className="shrink-0" />
                <Sidebar />
            </div>
            <div className="flex items-center gap-2 pr-4">
                <Button
                    className="w-12 h-8 p-0"
                    disabled={!getActiveBoard()?.columns?.length}
                    onClick={() => setOpenCreateTask(true)}
                >
                    <IconAdd />
                </Button>
                <BoardOptions />
            </div>
        </nav>
    );
};

Navbar.displayName = 'Navbar';
