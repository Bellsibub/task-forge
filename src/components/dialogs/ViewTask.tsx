import { TaskOptions } from '@/components/dropdowns/TaskOptions';
import { Checkbox, QuickSelect } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import { Dialog, Label } from 'radix-ui';

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
        <Dialog.Root open={openViewTask} onOpenChange={setOpenViewTask}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                <Dialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <Dialog.Title className="heading-lg flex items-center justify-between">
                        {activeTask?.title}
                        <TaskOptions />
                    </Dialog.Title>
                    <Dialog.Description className="text-mediumgrey">
                        {activeTask?.description}
                    </Dialog.Description>
                    <Label.Root className="text-xs text-mediumgrey font-bold -mb-2">
                        Subtasks (
                        {activeTask?.subtasks?.filter((s) => s.isCompleted)
                            .length || 0}{' '}
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
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

ViewTask.displayName = 'ViewTask';
