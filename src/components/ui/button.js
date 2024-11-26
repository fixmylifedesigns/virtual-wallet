import React from "react";

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-yellow-500 text-black hover:bg-yellow-600",
    outline:
      "border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-200",
    ghost: "hover:bg-zinc-800 text-zinc-200",
    secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
export default Button;
