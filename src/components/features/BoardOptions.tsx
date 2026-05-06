import IconVerticalEllipsis from '@/assets/icon-vertical-ellipsis.svg?react';
import { DeleteBoard } from '@/components/dialogs/DeleteBoard';
import { EditBoard } from '@/components/dialogs/EditBoard';
import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { DropdownMenu } from 'radix-ui';
import { useState } from 'react';

type BoardOptionsProps = {} & React.HTMLAttributes<HTMLDivElement> &
    DropdownMenu.DropdownMenuProps;

export const BoardOptions = ({ ...props }: BoardOptionsProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const { activeBoardId } = appStore((state) => state);

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
                        className="bg-white rounded-lg p-4 shadow-lg gap-4 flex flex-col w-48"
                    >
                        <DropdownMenu.Item
                            className="body-lg focus:outline-none hover:cursor-pointer hover:text-primary text-mediumgrey"
                            onSelect={() => setOpenEdit(true)}
                        >
                            Edit board
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="body-lg focus:outline-none hover:cursor-pointer hover:text-destructive-hover text-destructive"
                            onSelect={() => setOpenDelete(true)}
                        >
                            Delete board
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <DeleteBoard open={openDelete} onOpenChange={setOpenDelete} />
            <EditBoard
                open={openEdit}
                onOpenChange={setOpenEdit}
                setOpen={setOpenEdit}
            />
        </>
    );
};

BoardOptions.displayName = 'BoardOptions';
