import { Button } from '@/components/ui/Button';
import { AlertDialog } from 'radix-ui';

interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
}

const ConfirmationDialog = ({
    open,
    onOpenChange,
    title,
    description,
    onConfirm,
}: ConfirmationDialogProps) => {
    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-black/50 fixed inset-0 animate-fade-in z-20" />
                <AlertDialog.Content className="bg-white rounded-lg fixed p-6 w-[calc(100%-2rem)] max-w-120 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-content-show z-20 flex flex-col gap-6">
                    <AlertDialog.Title className="heading-lg text-destructive">
                        {title}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="body-lg text-mediumgrey">
                        {description}
                    </AlertDialog.Description>
                    <AlertDialog.Action asChild>
                        <Button variant="destructive" onClick={onConfirm}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel asChild>
                        <Button variant="secondary">Cancel</Button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};

ConfirmationDialog.displayName = 'ConfirmationDialog';

export { ConfirmationDialog };
export type { ConfirmationDialogProps };
