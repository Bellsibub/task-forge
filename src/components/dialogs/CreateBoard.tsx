import { Button, Input, MultiCreate } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';
import type { Board } from '@/lib/types';
import { Dialog } from 'radix-ui';
import { type SubmitHandler, useForm } from 'react-hook-form';

export const CreateBoard = () => {
    const { createBoard } = appStore((state) => state);
    const { openCreateBoard, setOpenCreateBoard } = uiStore((state) => state);

    const { control, handleSubmit, reset } = useForm<Board>({
        defaultValues: {
            id: crypto.randomUUID(),
            name: '',
            columns: [],
        },
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<Board> = (data) => {
        console.log(data);
        createBoard(data);
        reset();
        setOpenCreateBoard(false);
    };

    const handleOpenChange = (open: boolean) => {
        setOpenCreateBoard(open);
        if (!open) {
            reset();
        }
    };

    return (
        <Dialog.Root open={openCreateBoard} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in top-16 z-20" />
                <Dialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <Dialog.Title className="heading-lg">
                        Add new board
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
                            Create New Board
                        </Button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

CreateBoard.displayName = 'CreateBoard';
