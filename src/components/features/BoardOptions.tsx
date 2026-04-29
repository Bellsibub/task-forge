import IconVerticalEllipsis from '@/assets/icon-vertical-ellipsis.svg?react';
import { Button } from '@/components/ui';
import { DropdownMenu } from 'radix-ui';

type BoardOptionsProps = {} & React.HTMLAttributes<HTMLDivElement> & DropdownMenu.DropdownMenuProps;

export const BoardOptions = ({ ...props }: BoardOptionsProps) => {
    return (
        <DropdownMenu.Root {...props}>
            <DropdownMenu.Trigger asChild>
                <Button variant="ghost" className="focus:outline-none">
                    <IconVerticalEllipsis />
                </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    className="bg-white rounded-lg p-4 shadow-lg gap-4 flex flex-col w-48"
                >
                    <DropdownMenu.Item className="body-lg focus:outline-none hover:cursor-pointer hover:text-primary text-mediumgrey">
                        Edit board
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="body-lg focus:outline-none hover:cursor-pointer hover:text-destructive-hover text-destructive">
                        Delete board
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

BoardOptions.displayName = 'BoardOptions';
