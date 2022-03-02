import React from 'react';

export type Props = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { children, type = 'button', ...props },
  ref
) {
  return (
    <button ref={ref} type={type} className="bg-blue-500" {...props}>
      {children}
    </button>
  );
});
