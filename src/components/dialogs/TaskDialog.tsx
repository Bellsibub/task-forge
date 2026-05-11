import {
    Button,
    DialogShell,
    Input,
    MultiCreate,
    Select,
} from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Task } from '@/lib/types';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type TaskDialogProps = {
    mode: 'create' | 'edit';
} & React.HTMLAttributes<HTMLDivElement>;

export const TaskDialog = ({ mode }: TaskDialogProps) => {
    const { activeTask, editTask, activeBoardId, getActiveBoard, createTask } =
        appStore((state) => state);
    const {
        createTaskViaColumnId,
        setOpenCreateTask,
        openCreateTask,
        openEditTask,
        setOpenEditTask,
    } = uiStore((state) => state);

    const open = mode === 'create' ? openCreateTask : openEditTask;
    const setOpen = mode === 'create' ? setOpenCreateTask : setOpenEditTask;

    const { control, handleSubmit, reset } = useForm<Task>({
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (open) {
            reset(
                mode === 'create'
                    ? {
                          id: crypto.randomUUID(),
                          title: '',
                          description: '',
                          columnId:
                              createTaskViaColumnId ||
                              getActiveBoard()?.columns?.[0].id,
                          subtasks: [],
                      }
                    : (activeTask ?? undefined),
            );
        }
    }, [open, mode, reset, createTaskViaColumnId, getActiveBoard, activeTask]);

    const onSubmit: SubmitHandler<Task> = (data) => {
        if (mode === 'create') {
            createTask(data, activeBoardId!);
        } else {
            editTask(data, activeBoardId!);
        }
        reset();
        setOpen(false);
    };

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        if (!open) {
            reset();
        }
    };

    return (
        <DialogShell
            open={open}
            onOpenChange={handleOpenChange}
            title={mode === 'create' ? 'Create Task' : 'Edit Task'}
        >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Title"
                    name="title"
                    control={control}
                    placeholder="e.g. Take coffee break"
                    rules={{ required: 'Task title is required' }}
                />
                <Input
                    label="Description"
                    name="description"
                    control={control}
                    placeholder="e.g. Get a fresh cup of coffee"
                    textarea={true}
                />
                <MultiCreate
                    label="Subtasks"
                    name="subtasks"
                    fieldKey="title"
                    addLabel="+ Add New Subtask"
                    placeholder='e.g. "Research competitors"'
                    control={control}
                />
                <Select
                    label="Status"
                    name="columnId"
                    control={control}
                    options={
                        getActiveBoard()?.columns?.map((column) => ({
                            value: column.id,
                            label: column.name,
                        })) || []
                    }
                />
                <Button type="submit" className="w-full">
                    {mode === 'create' ? 'Create Task' : 'Edit Task'}
                </Button>
            </form>
        </DialogShell>
    );
};

TaskDialog.displayName = 'TaskDialog';
