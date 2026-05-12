import IconSidebar from '@/assets/icon-show-sidebar.svg?react';
import FullLogoDark from '@/assets/logo-dark.svg?react';
import FullLogoLight from '@/assets/logo-light.svg?react';
import { BoardDialog } from '@/components/dialogs/BoardDialog';
import { DeleteBoard } from '@/components/dialogs/DeleteBoard';
import { DeleteTask } from '@/components/dialogs/DeleteTask';
import { TaskDialog } from '@/components/dialogs/TaskDialog';
import { ViewTask } from '@/components/dialogs/ViewTask';
import { Board } from '@/components/layout/Board';
import { NoBoards } from '@/components/layout/Empties';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Board as BoardType } from '@/lib/types';
import { cn } from '@/lib/utils';

function App() {
    const { boards, getActiveBoard } = appStore((state) => state);
    const { setSidebarOpen, sidebarOpen } = uiStore((state) => state);

    return (
        <>
            <div className="flex flex-col h-screen overflow-hidden">
                <div className="bg-white dark:bg-darkgrey h-16 md:h-20 lg:h-24 flex items-center">
                    <div
                        className={cn(
                            'hidden md:flex',
                            'w-50 lg:w-52.25 h-full items-center transition-[width] duration-300 ease-in-out pl-6',
                            'border-r border-lines-light dark:border-lines-dark',
                            !sidebarOpen &&
                                'border-b border-lines-light dark:border-lines-dark',
                            sidebarOpen && 'w-65 lg:w-75',
                        )}
                    >
                        <FullLogoDark className="block dark:hidden" />
                        <FullLogoLight className="hidden dark:block" />
                    </div>
                    <Navbar className="bg-white dark:bg-darkgrey flex-1 flex items-center justify-between border-b border-lines-light dark:border-lines-dark h-full" />
                </div>
                <div className="flex-1 flex">
                    <Sidebar
                        className={cn(
                            'hidden md:block',
                            'bg-white overflow-hidden dark:bg-darkgrey',
                            'border-r border-lines-light dark:border-lines-dark',
                            'transition-[width] duration-300 ease-in-out',
                            sidebarOpen ? 'w-50 md:w-65 lg:w-75' : 'w-0',
                        )}
                    />
                    {boards.length ? (
                        <Board
                            className="flex-1 overflow-auto m-6 "
                            data={getActiveBoard() as BoardType}
                        />
                    ) : (
                        <NoBoards className="flex-1 overflow-auto flex items-center justify-center" />
                    )}
                </div>
            </div>

            <Button
                className={cn(
                    'md:block hidden',
                    sidebarOpen && 'md:hidden',
                    'rounded-l-none absolute bottom-8',
                )}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <IconSidebar />
            </Button>

            {/* Dialogs */}
            <BoardDialog mode="create" />
            <BoardDialog mode="edit" />
            <DeleteBoard />
            <TaskDialog mode="create" />
            <TaskDialog mode="edit" />
            <ViewTask />
            <DeleteTask />
        </>
    );
}

export default App;
