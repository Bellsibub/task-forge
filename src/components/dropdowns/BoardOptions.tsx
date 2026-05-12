import IconVerticalEllipsis from '@/assets/icon-vertical-ellipsis.svg?react';
import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { DropdownMenu } from 'radix-ui';

type BoardOptionsProps = {} & React.HTMLAttributes<HTMLDivElement> &
    DropdownMenu.DropdownMenuProps;

export const BoardOptions = ({ ...props }: BoardOptionsProps) => {
    const { activeBoardId } = appStore((state) => state);
    const { setOpenEditBoard, setOpenDeleteBoard } = uiStore((state) => state);

    return (
        <>
            <DropdownMenu.Root {...props}>
                <DropdownMenu.Trigger asChild>
                    <Button
                        variant="ghost"
                        className="focus:outline-none"
                        disabled={!activeBoardId}
                    >
                        <IconVerticalEllipsis />
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        align="end"
                        className="bg-white dark:bg-bg-dark rounded-lg p-4 shadow-lg gap-4 flex flex-col w-48"
                    >
                        <DropdownMenu.Item
                            className="body-lg focus:outline-none hover:cursor-pointer hover:text-primary text-mediumgrey"
                            onSelect={() => setOpenEditBoard(true)}
                        >
                            Edit board
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="body-lg focus:outline-none hover:cursor-pointer hover:text-destructive-hover text-destructive"
                            onSelect={() => setOpenDeleteBoard(true)}
                        >
                            Delete board
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};

BoardOptions.displayName = 'BoardOptions';
