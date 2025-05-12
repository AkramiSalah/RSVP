import React from "react";
import classNames from "classnames";

export const Card = ({ children, className }) => {
  return (
    <div className={classNames("bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6", className)}>
      {children}
    </div>
  );
};
