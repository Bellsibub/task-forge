import IconAdd from '@/assets/icon-add-task-mobile.svg?react';
import Logo from '@/assets/logo-mobile.svg?react';
import { MobileSidebar } from '@/components/dialogs/MobileSidebar';
import { BoardOptions } from '@/components/dropdowns/BoardOptions';
import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';

type NavbarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Navbar = ({ ...props }: NavbarProps) => {
    const { getActiveBoard } = appStore((state) => state);
    const { setOpenCreateTask } = uiStore((state) => state);

    return (
        <nav {...props}>
            <div className="flex items-center pl-4 min-w-0 overflow-hidden">
                <Logo className="shrink-0 md:hidden" />
                <MobileSidebar className="md:hidden" />
                <h1
                    className={cn(
                        'hidden md:block',
                        'heading-lg truncate px-4 lg:text-2xl',
                        !getActiveBoard() && 'text-mediumgrey',
                    )}
                >
                    {getActiveBoard()?.name || 'No Boards'}
                </h1>
                {/* )} */}
            </div>
            <div className="flex items-center gap-2 pr-4">
                <Button
                    className="w-12 h-8 p-0 md:w-auto md:h-12 md:px-6"
                    disabled={!getActiveBoard()?.columns?.length}
                    onClick={() => setOpenCreateTask(true)}
                >
                    <span className="hidden md:block">+ Add New Task</span>
                    <IconAdd className="block md:hidden" />
                </Button>
                <BoardOptions />
            </div>
        </nav>
    );
};

Navbar.displayName = 'Navbar';
