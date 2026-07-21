import React from "react";

function TableBody({ children }) {
  return (
    <tbody className="divide-y *:divide-x divide-neutral-200 *:divide-neutral-200 *:odd:bg-neutral-100">
      {children}
    </tbody>
  );
}

export default TableBody;
