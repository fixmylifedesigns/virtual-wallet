import React from "react";

const Card = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ className = "", children, ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ className = "", children, ...props }) => {
  return (
    <p className={`text-sm text-zinc-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

const CardContent = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

export default Card;
