import IconBoard from '@/assets/icon-board.svg?react';
import IconDark from '@/assets/icon-dark-theme.svg?react';
import IconSidebar from '@/assets/icon-hide-sidebar.svg?react';
import IconLight from '@/assets/icon-light-theme.svg?react';
import { Button, Switch } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import themeStore from '@/lib/store/theme';
import { uiStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';
import { useStore } from 'zustand';

type SidebarProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ ...props }: SidebarProps) => {
    const { boards, activeBoardId, setActiveBoard, reset } = appStore(
        (state) => state,
    );
    const { setSidebarOpen, setOpenCreateBoard } = uiStore((state) => state);
    const setTheme = useStore(themeStore, (state) => state.setTheme);
    const isDarkTheme = useStore(themeStore, (state) => state.theme === 'dark');
    return (
        <aside {...props}>
            <div className="flex flex-col justify-between h-full py-8">
                <div className="pr-6">
                    <h4 className="heading-sm uppercase pl-6 mb-4 text-mediumgrey">
                        All boards ({boards.length})
                    </h4>
                    {boards.map((board) => (
                        <Button
                            key={board.id}
                            variant={
                                board.id === activeBoardId ? 'primary' : 'ghost'
                            }
                            className={cn(
                                'w-full justify-start rounded-l-none pl-6 gap-3',
                                board.id !== activeBoardId &&
                                    'text-mediumgrey hover:text-primary hover:bg-primary/25',
                            )}
                            onClick={() => {
                                setActiveBoard(board.id);
                            }}
                        >
                            <IconBoard className="shrink-0" />
                            {board.name}
                        </Button>
                    ))}
                    <Button
                        onClick={() => setOpenCreateBoard(true)}
                        variant="ghost"
                        className="w-full justify-start rounded-l-none pl-6 text-primary gap-3 hover:bg-primary/25"
                    >
                        <IconBoard className="shrink-0" />+ Create New Board
                    </Button>
                </div>
                <div className="mx-3 lg:mx-6">
                    <div className="flex items-center justify-center bg-bg-light dark:bg-bg-dark py-3.5 rounded-md gap-6 mb-2">
                        <IconLight className="shrink-0" />
                        <Switch onCheckedChange={setTheme} defaultChecked={isDarkTheme} />
                        <IconDark className="shrink-0" />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setSidebarOpen(false)}
                        className="w-full justify-start rounded-l-none  text-mediumgrey gap-3 hover:bg-primary/25 -ml-6 pl-6"
                    >
                        <IconSidebar className="shrink-0" />
                        <span className="heading-md text-mediumgrey">
                            Hide Sidebar
                        </span>
                    </Button>
                    <Button
                        onClick={() => {
                            reset();
                        }}
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/25 w-full justify-start rounded-l-none gap-3 -ml-6 pl-6"
                    >
                        Reset App
                    </Button>
                </div>
            </div>
        </aside>
    );
};

Sidebar.displayName = 'Sidebar';
