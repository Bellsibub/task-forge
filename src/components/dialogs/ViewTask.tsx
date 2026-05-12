import { TaskOptions } from '@/components/dropdowns/TaskOptions';
import { Checkbox, DialogShell, QuickSelect } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { Label } from 'radix-ui';

export const ViewTask = () => {
    const { getActiveBoard, activeTask, updateTaskStatus, completeSubTask } =
        appStore((state) => state);
    const { openViewTask, setOpenViewTask } = uiStore((state) => state);

    const handleStatusChange = (columnId: string) => {
        if (!activeTask) return;
        updateTaskStatus(activeTask.id, columnId, getActiveBoard()!.id);
    };

    const handleCompleteSubtask = (subtaskId: string, isCompleted: boolean) => {
        if (!activeTask) return;
        completeSubTask(
            activeTask.id,
            subtaskId,
            isCompleted,
            getActiveBoard()!.id,
        );
    };

    return (
        <DialogShell
            open={openViewTask}
            onOpenChange={setOpenViewTask}
            title={activeTask?.title}
            description={activeTask?.description || undefined}
            titleChildren={<TaskOptions />}
        >
            <Label.Root className="text-xs text-mediumgrey dark:text-white font-bold -mb-2">
                Subtasks (
                {activeTask?.subtasks?.filter((s) => s.isCompleted).length || 0}{' '}
                of {activeTask?.subtasks?.length || 0})
            </Label.Root>
            <div className="flex flex-col gap-2">
                {activeTask?.subtasks?.map((subtask) => (
                    <Checkbox
                        key={subtask.id}
                        id={subtask.id}
                        label={subtask.title}
                        defaultChecked={subtask.isCompleted}
                        onCheckedChange={(checked) =>
                            handleCompleteSubtask(subtask.id, !!checked)
                        }
                    />
                ))}
                {!activeTask?.subtasks?.length && (
                    <p className="text-sm text-mediumgrey italic">
                        Edit the task to add subtasks.
                    </p>
                )}
            </div>
            <QuickSelect
                label="Current Status"
                defaultValue={activeTask?.columnId}
                onValueChange={handleStatusChange}
                options={
                    getActiveBoard()?.columns?.map((column) => ({
                        value: column.id,
                        label: column.name,
                    })) || []
                }
            />
        </DialogShell>
    );
};

ViewTask.displayName = 'ViewTask';
