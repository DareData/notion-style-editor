import { clsx } from 'clsx';

type ButtonProp = 'primary' | 'secondary';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  prop?: ButtonProp;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  prop = 'primary',
  children,
  ...rest
}) => (
  <button {...{ type }} {...rest} className={clsx('button', prop)}>
    {children}
  </button>
);
