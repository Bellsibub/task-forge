import { ConfirmationDialog } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';

export const DeleteTask = () => {
    const { deleteTask, activeBoardId, activeTask } = appStore(
        (state) => state,
    );
    const { openDeleteTask, setOpenDeleteTask, setOpenViewTask } = uiStore(
        (state) => state,
    );

    return (
        <ConfirmationDialog
            open={openDeleteTask}
            onOpenChange={setOpenDeleteTask}
            title="Delete this task?"
            description={`Are you sure you want to delete the ‘${activeTask?.title}’ task? This action will remove the task and cannot be reversed.`}
            onConfirm={() => {
                deleteTask(activeTask!.id, activeBoardId!);
                setOpenViewTask(false);
            }}
        />
    );
};

DeleteTask.displayName = 'DeleteTask';
