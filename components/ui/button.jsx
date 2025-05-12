import React from "react";
import classNames from "classnames";

export const Button = ({ children, onClick, variant = "default", className }) => {
  const baseStyles = "rounded-lg px-4 py-2 font-semibold focus:outline-none transition-all";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button onClick={onClick} className={classNames(baseStyles, variants[variant], className)}>
      {children}
    </button>
  );
};
