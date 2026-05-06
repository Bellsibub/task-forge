import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { AlertDialog } from 'radix-ui';
import { type ComponentProps } from 'react';

type DeleteBoardProps = {} & ComponentProps<typeof AlertDialog.Root>;

export const DeleteBoard = ({ ...props }: DeleteBoardProps) => {
    const getActiveBoard = appStore((state) => state.getActiveBoard);
    const deleteBoard = appStore((state) => state.deleteBoard);

    return (
        <AlertDialog.Root {...props}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                <AlertDialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <AlertDialog.Title className="heading-lg text-destructive">
                        Delete this board?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="body-lg text-mediumgrey">
                        Are you sure you want to delete the ‘
                        {getActiveBoard()?.name}’ board? This action will remove
                        all columns and tasks and cannot be reversed.
                    </AlertDialog.Description>
                    <AlertDialog.Action asChild>
                        <Button
                            variant="destructive"
                            onClick={() => deleteBoard(getActiveBoard()!.id)}
                        >
                            Delete
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel asChild>
                        <Button variant="secondary">Cancel</Button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

DeleteBoard.displayName = 'DeleteBoard';
