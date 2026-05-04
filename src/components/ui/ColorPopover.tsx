import { cn } from '@/lib/utils';
import { Popover, RadioGroup } from 'radix-ui';

type ColorPopoverProps = {
    value: string | undefined;
    onChange: (color: string) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const ColorPopover = ({ value, onChange }: ColorPopoverProps) => {
    return (
        <Popover.Root>
            <Popover.Trigger
                className={cn('w-8 my-2 mr-2 rounded', `bg-${value}`)}
            />
            <Popover.Portal>
                <Popover.Content
                    sideOffset={5}
                    align="start"
                    className="p-5 w-52 bg-bg-light border-lines-light rounded-lg fixed shadow-2xl z-30"
                >
                    <div>
                        <RadioGroup.Root
                            orientation="horizontal"
                            value={value}
                            onValueChange={onChange}
                            className="flex flex-row gap-2"
                        >
                            <RadioGroup.Item
                                className="bg-primary size-6 rounded border border-mediumgrey/25"
                                value="primary"
                                id="primary"
                            >
                                <RadioGroup.Indicator className="flex items-center justify-center size-full relative after:bg-white after:w-2.5 after:h-2.5 after:rounded-full" />
                            </RadioGroup.Item>
                            <RadioGroup.Item
                                className="bg-accent size-6 rounded border border-mediumgrey/25"
                                value="accent"
                                id="accent"
                            >
                                <RadioGroup.Indicator className="flex items-center justify-center size-full relative after:bg-white after:w-2.5 after:h-2.5 after:rounded-full" />
                            </RadioGroup.Item>
                            <RadioGroup.Item
                                className="bg-mediumgrey size-6 rounded border border-mediumgrey/25"
                                value="mediumgrey"
                                id="mediumgrey"
                            >
                                <RadioGroup.Indicator className="flex items-center justify-center size-full relative after:bg-white after:w-2.5 after:h-2.5 after:rounded-full" />
                            </RadioGroup.Item>
                            <RadioGroup.Item
                                className="bg-destructive size-6 rounded border border-mediumgrey/25"
                                value="destructive"
                                id="destructive"
                            >
                                <RadioGroup.Indicator className="flex items-center justify-center size-full relative after:bg-white after:w-2.5 after:h-2.5 after:rounded-full" />
                            </RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

ColorPopover.displayName = 'ColorPopover';
