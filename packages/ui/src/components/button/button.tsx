import React from 'react';

export type Props = {
  children: React.ReactNode;
  variant?: 'sea' | 'salmon' | 'navy';
} & React.ComponentPropsWithoutRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { children, type = 'button', variant = 'sea', ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={`bg-${variant}-600`} {...props}>
      {children}
    </button>
  );
});
