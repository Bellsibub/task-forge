import { Button, DialogShell, Input, MultiCreate } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Board } from '@/lib/types';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type BoardDialogProps = {
    mode: 'create' | 'edit';
} & React.HTMLAttributes<HTMLDivElement>;

export const BoardDialog = ({ mode }: BoardDialogProps) => {
    const { updateBoard, getActiveBoard, createBoard } = appStore(
        (state) => state,
    );
    const {
        openEditBoard,
        setOpenEditBoard,
        openCreateBoard,
        setOpenCreateBoard,
    } = uiStore((state) => state);

    const open = mode === 'create' ? openCreateBoard : openEditBoard;
    const setOpen = mode === 'create' ? setOpenCreateBoard : setOpenEditBoard;

    const { control, handleSubmit, reset } = useForm<Board>({
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (open) {
            reset(
                mode === 'create'
                    ? {
                          id: crypto.randomUUID(),
                          name: '',
                          columns: [],
                      }
                    : getActiveBoard(),
            );
        }
    }, [open, mode, getActiveBoard, reset]);

    const onSubmit: SubmitHandler<Board> = (data) => {
        if (mode === 'create') {
            createBoard(data);
        } else {
            updateBoard(data);
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
            title={mode === 'create' ? 'Add new board' : 'Edit board'}
        >
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Board name"
                    name="name"
                    control={control}
                    placeholder="e.g. Web Design"
                    rules={{ required: 'Board name is required' }}
                />
                <MultiCreate
                    label="Board Columns"
                    name="columns"
                    fieldKey="name"
                    colorKey="color"
                    addLabel="+ Add New Column"
                    placeholder='e.g. "To Do"'
                    control={control}
                />
                <Button type="submit" className="w-full">
                    {mode === 'create' ? 'Create New Board' : 'Save Changes'}
                </Button>
            </form>
        </DialogShell>
    );
};

BoardDialog.displayName = 'BoardDialog';
