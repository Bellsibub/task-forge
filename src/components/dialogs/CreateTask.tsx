import { Button, Input, MultiCreate, Select } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Task } from '@/lib/types';
import { Dialog } from 'radix-ui';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

export const CreateTask = () => {
    const { createTask, activeBoardId, getActiveBoard } = appStore(
        (state) => state,
    );
    const { openCreateTask, setOpenCreateTask, createTaskViaColumnId } = uiStore((state) => state);

    const { control, handleSubmit, reset } = useForm<Task>({
        defaultValues: {
            id: crypto.randomUUID(),
            title: '',
            description: '',
            columnId: createTaskViaColumnId || getActiveBoard()?.columns?.[0].id,
            subtasks: [],
        },
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (openCreateTask) {
            reset({
                id: crypto.randomUUID(),
                title: '',
                description: '',
                columnId: createTaskViaColumnId || getActiveBoard()?.columns?.[0].id,
                subtasks: [],
            });
        }
    }, [openCreateTask, createTaskViaColumnId, getActiveBoard, reset]);

    const onSubmit: SubmitHandler<Task> = (data) => {
        console.log(data);
        createTask(data, activeBoardId!);
        reset();
        setOpenCreateTask(false);
    };

    const handleOpenChange = (open: boolean) => {
        setOpenCreateTask(open);
        if (!open) {
            reset();
        }
    };

    return (
        <Dialog.Root open={openCreateTask} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in z-20" />
                <Dialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <Dialog.Title className="heading-lg">
                        Add new task
                    </Dialog.Title>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                            Create Task
                        </Button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

CreateTask.displayName = 'CreateTask';
