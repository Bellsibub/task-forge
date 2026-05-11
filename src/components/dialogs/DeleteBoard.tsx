import { ConfirmationDialog } from '@/components/ui';
import { appStore } from '@/lib/store/app';
import { uiStore } from '@/lib/store/ui';

export const DeleteBoard = () => {
    const { deleteBoard, getActiveBoard } = appStore((state) => state);
    const { openDeleteBoard, setOpenDeleteBoard } = uiStore((state) => state);

    return (
        <ConfirmationDialog
            open={openDeleteBoard}
            onOpenChange={setOpenDeleteBoard}
            title="Delete this board?"
            description={`Are you sure you want to delete the ‘${getActiveBoard()?.name}’ board? This action will remove all columns and tasks and cannot be reversed.`}
            onConfirm={() => deleteBoard(getActiveBoard()!.id)}
        />
    );
};

DeleteBoard.displayName = 'DeleteBoard';
