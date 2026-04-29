import { Slot as RadixSlot } from 'radix-ui';
import { forwardRef } from 'react';

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'destructive';
type ButtonSize = 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-primary text-white hover:bg-primary-hover',
    secondary:
        'bg-primary/10 dark:bg-white/90 text-primary hover:bg-primary/25 dark:hover:bg-white',
    destructive:
        'bg-destructive text-white hover:bg-destructive-hover',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-[13px] font-bold leading-5.75 h-10',
    lg: 'heading-md h-12',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'lg',
            asChild = false,
            className = '',
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? RadixSlot.Slot : 'button';
        return (
            <Comp
                ref={ref}
                className={[
                    'inline-flex items-center justify-center gap-2 rounded-3xl border-0 cursor-pointer',
                    'transition-colors duration-500 ease-in-out',
                    'px-2 w-full',
                    'disabled:opacity-50 disabled:pointer-events-none',
                    variantClasses[variant],
                    sizeClasses[size],
                    className,
                ].join(' ')}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };