import { Button } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { AlertDialog } from 'radix-ui';

export const DeleteTask = () => {
    const { deleteTask, activeBoardId, activeTask } = appStore(
        (state) => state,
    );
    const { openDeleteTask, setOpenDeleteTask, setOpenViewTask } = uiStore(
        (state) => state,
    );

    return (
        <AlertDialog.Root
            open={openDeleteTask}
            onOpenChange={setOpenDeleteTask}
        >
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                <AlertDialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <AlertDialog.Title className="heading-lg text-destructive">
                        Delete this task?
                    </AlertDialog.Title>
                    <AlertDialog.Description className="body-lg text-mediumgrey">
                        Are you sure you want to delete the ‘{activeTask?.title}
                        ’ task? This action will remove the task and cannot be
                        reversed.
                    </AlertDialog.Description>
                    <AlertDialog.Action asChild>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                deleteTask(activeTask!.id, activeBoardId!);
                                setOpenViewTask(false);
                            }}
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

DeleteTask.displayName = 'DeleteTask';
