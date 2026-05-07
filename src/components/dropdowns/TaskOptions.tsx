import IconVerticalEllipsis from '@/assets/icon-vertical-ellipsis.svg?react';
import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { DropdownMenu } from 'radix-ui';

type TaskOptionsProps = {} & React.HTMLAttributes<HTMLDivElement> &
    DropdownMenu.DropdownMenuProps;

export const TaskOptions = ({ ...props }: TaskOptionsProps) => {
    const { activeBoardId } = appStore((state) => state);
    const { setOpenEditTask, setOpenDeleteTask } = uiStore((state) => state);

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
                        className="bg-white rounded-lg p-4 shadow-lg gap-4 flex flex-col w-48 z-35"
                    >
                        <DropdownMenu.Item
                            className="body-lg focus:outline-none hover:cursor-pointer hover:text-primary text-mediumgrey"
                            onSelect={() => setOpenEditTask(true)}
                        >
                            Edit task
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="body-lg focus:outline-none hover:cursor-pointer hover:text-destructive-hover text-destructive"
                            onSelect={() => setOpenDeleteTask(true)}
                        >
                            Delete task
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};

TaskOptions.displayName = 'TaskOptions';
