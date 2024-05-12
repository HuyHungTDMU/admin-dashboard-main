import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, forwardRef, SVGProps } from 'react';
import LoadingIcon from '../../assets/icons/LoadingIcon';

export type IconButton = FC<SVGProps<SVGSVGElement>>;

export type ButtonIconOrientation = 'left' | 'right';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconButton;
  iconOrientation?: ButtonIconOrientation;
  label?: string;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      icon: Icon,
      loading = false,
      iconOrientation = 'left',
      label,
      ...rest
    },
    ref,
  ) => {
    const buttonClasses = clsx(
      'text-primary flex gap-3 items-center p-2 md:px-5 md:py-3 rounded-full bg-primary-50 w-fit text-lg border-2 border-neutral-90 shadow-box-default hover:shadow-none active:shadow-none',
      {
        'flex-row-reverse': iconOrientation === 'right',
      },
      className,
    );

    return (
      <button ref={ref} className={buttonClasses} {...rest}>
        {Icon && <Icon className={'w-6 h-6'} />}
        {loading && <LoadingIcon />}
        {label && <span className="text-sm md:text-xl">{label}</span>}
        {rest.children}
      </button>
    );
  },
);

Button.displayName = 'Button';
