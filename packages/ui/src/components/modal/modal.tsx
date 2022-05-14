import { FC, ReactNode } from "react";

import cx from "classnames";

type Props = {
  children?: ReactNode;
  className?: string;
  maxWidth?: string;
  maxHeight?: string;
};

export const Modal: FC<Props> = ({
  children,
  className,
  maxWidth = "max-w-2xl",
  maxHeight = "max-h-screen",
}) => (
  <div className={cx(className, "fixed rounded-xl shadow-md z-50 inset-0")}>
    <div
      className={cx(
        "grid place-items-center h-full max-h-screen overflow-auto text-center md:px-4 md:pb-8"
      )}>
      <div
        className={cx(
          "inline-block w-full text-left align-middle transition-all transform bg-white md:shadow-xl md:rounded-2xl",
          maxWidth,
          maxHeight,
          className
        )}>
        <div className="flex flex-col h-full max-h-screen p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  </div>
);
