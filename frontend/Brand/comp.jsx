import React from "react";

// Card wrapper
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

// Header
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`border-b pb-2 mb-4 ${className}`}>
      {children}
    </div>
  );
};

// Title
export const CardTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
};

// Content
export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`text-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white ${className}`}
      {...props}
    />
  );
});

export const Button = ({ className = "", children, ...props }) => {
  return (
    <button
      className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Alert = ({ children, className = "" }) => {
  return (
    <div
      className={`border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <div className="font-semibold mb-1">{children}</div>
);

export const AlertDescription = ({ children }) => (
  <div className="text-sm">{children}</div>
);
