import React from "react";

const Badge = ({
  children,
  className = "",
}: {
  children?: number;
  className?: string;
}) => {
  return (
    <div
      className={`text-sm font-bold px-2 py-1 rounded border border-gray-300 bg-green-500 text-white inline-flex justify-center items-center ${className}`}
      style={{
        width: "20px",
        height: "20px",
        textAlign: "center",
        lineHeight: "20px",
      }}
    >
      {children}
    </div>
  );
};
export default Badge;
