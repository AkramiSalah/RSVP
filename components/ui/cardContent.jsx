import React from "react";
import classNames from "classnames";

export const CardContent = ({ children, className }) => {
  return <div className={classNames("mt-2", className)}>{children}</div>;
};
