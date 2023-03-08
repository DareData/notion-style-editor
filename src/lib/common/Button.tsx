import { clsx } from 'clsx';
import { forwardRef } from 'react';

type ButtonProp = 'primary' | 'secondary';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  prop?: ButtonProp;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = 'button', prop = 'primary', children, className = '', ...rest },
    buttonRef
  ) => (
    <button
      {...{ type }}
      {...rest}
      ref={buttonRef}
      className={clsx('button', prop, className)}>
      {children}
    </button>
  )
);
