import IconBoard from '@/assets/icon-board.svg?react';
import IconChevronDown from '@/assets/icon-chevron-down.svg?react';
import IconChevronUp from '@/assets/icon-chevron-up.svg?react';
import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { cn } from '@/lib/utils';
import { Dialog } from 'radix-ui';

export const Sidebar = () => {
    const { boards, getActiveBoard, activeBoardId, setActiveBoard, reset } =
        appStore((state) => state);
    const { sidebarOpen, setSidebarOpen, setOpenCreateBoard } = uiStore(
        (state) => state,
    );
    return (
        <>
            <Dialog.Root open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <Dialog.Trigger asChild>
                    <Button
                        variant="ghost"
                        className="min-w-0 max-w-full"
                        disabled={boards.length === 0}
                    >
                        <span className="heading-lg truncate">
                            {boards.length === 0
                                ? 'No boards'
                                : getActiveBoard()?.name}
                        </span>
                        {sidebarOpen ? (
                            <IconChevronUp className="shrink-0" />
                        ) : (
                            <IconChevronDown className="shrink-0" />
                        )}
                    </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                    <Dialog.Content className="bg-white rounded-lg fixed p-6 pl-0 w-full max-w-66 top-16 mt-4 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                        <Dialog.Title className="heading-sm uppercase pl-6">
                            All boards ({boards.length})
                        </Dialog.Title>
                        <div>
                            {boards.map((board) => (
                                <Button
                                    key={board.id}
                                    variant={
                                        board.id === activeBoardId
                                            ? 'primary'
                                            : 'ghost'
                                    }
                                    className={cn(
                                        'w-full justify-start rounded-l-none pl-6 gap-3',
                                        board.id !== activeBoardId &&
                                            'text-mediumgrey hover:text-primary hover:bg-primary/25',
                                    )}
                                    onClick={() => {
                                        setActiveBoard(board.id);
                                        setSidebarOpen(false);
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
                                <IconBoard className="shrink-0" />+ Create New
                                Board
                            </Button>
                            <Button
                                onClick={() => {
                                    reset();
                                    setSidebarOpen(false);
                                }}
                                variant="ghost"
                                className="w-full justify-start rounded-l-none pl-6 text-destructive gap-3 hover:bg-destructive/25"
                            >
                                Reset App
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
};

Sidebar.displayName = 'Sidebar';
