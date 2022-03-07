import React from 'react';

import cx from 'classnames';

import styles from './button.module.scss';

export type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'simple' | 'rounded' | 'outline' | 'text';
  color?: 'sea' | 'salmon' | 'navy';
} & React.ComponentPropsWithoutRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    {
      children,
      className,
      type = 'button',
      variant = 'simple',
      color = 'sea',
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(className, styles.root, styles[variant], styles[color])}
        {...props}>
        {children}
      </button>
    );
  }
);
