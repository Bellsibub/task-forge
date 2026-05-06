import { Button, Input, MultiCreate } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Board } from '@/lib/types';
import { Dialog } from 'radix-ui';
import { useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

export const EditBoard = () => {
    const { updateBoard, getActiveBoard } = appStore((state) => state);
    const { openEditBoard, setOpenEditBoard } = uiStore((state) => state);

    const { control, handleSubmit, reset } = useForm<Board>({
        defaultValues: {
            id: '',
            name: '',
            columns: [],
        },
        mode: 'onSubmit',
    });

    useEffect(() => {
        if (openEditBoard) {
            const board = getActiveBoard();
            reset(board);
        }
    }, [openEditBoard, getActiveBoard, reset]);

    const onSubmit: SubmitHandler<Board> = (data) => {
        updateBoard(data);
        reset();
        setOpenEditBoard(false);
    };

    const handleOpenChange = (open: boolean) => {
        setOpenEditBoard(open);
        if (!open) {
            reset();
        }
    };

    return (
        <Dialog.Root open={openEditBoard} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                <Dialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <Dialog.Title className="heading-lg">
                        Edit board
                    </Dialog.Title>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                            Save Changes
                        </Button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

EditBoard.displayName = 'EditBoard';
