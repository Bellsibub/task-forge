import { Button, Input, MultiCreate } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import type { Board } from '@/lib/types';
import { Dialog } from 'radix-ui';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type CreateBoardProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const CreateBoard = ({ ...props }: CreateBoardProps) => {
    const [open, setOpen] = useState(false);
    const { createBoard } = appStore((state) => state);

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
        setOpen(false);
    };

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        if (!open) {
            reset();
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} {...props}>
            <Dialog.Trigger asChild>
                <Button variant="primary" className="min-w-0 max-w-full">
                    + Add new board
                </Button>
            </Dialog.Trigger>
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
