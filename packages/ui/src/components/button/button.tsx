import Link from "next/link";
import React from "react";

import cx from "classnames";

import styles from "./button.module.scss";

export type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "simple" | "rounded" | "outline" | "rounded-outline" | "text";
  color?: "sea" | "salmon" | "navy" | "blue";
  size?: "sm" | "md" | "lg";
  href?: string;
} & React.ComponentPropsWithoutRef<"button">;

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  function Button(
    {
      children,
      className,
      type = "button",
      variant = "simple",
      color = "sea",
      size = "md",
      href,
      ...otherProps
    },
    ref
  ) {
    const withChildren = (children: React.ReactNode) => {
      if (href)
        return (
          <Link href={href}>
            <a>{children}</a>
          </Link>
        );

      return children;
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          className,
          styles.root,
          styles[variant],
          styles[color],
          styles[size]
        )}
        {...otherProps}>
        {withChildren(children)}
      </button>
    );
  }
);
