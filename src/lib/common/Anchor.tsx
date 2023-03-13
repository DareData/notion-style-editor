import clsx from 'clsx';

type AnchorType = 'primary' | 'anchor-button';

type AnchorProps = {
  type?: AnchorType;
  children: React.ReactNode;
} & React.HTMLProps<HTMLAnchorElement>;

export const Anchor: React.FC<AnchorProps> = ({
  children,
  type = 'primary',
  className = '',
  ...rest
}) => (
  <a {...rest} className={clsx('anchor', type, className)}>
    {children}
  </a>
);
