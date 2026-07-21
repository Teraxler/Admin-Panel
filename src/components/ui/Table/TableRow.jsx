import React from "react";

function TableRow({ children }) {
  return (
    <tr className="text-secondary *:font-medium *:not-last:border-r *:border-r-neutral-200">
      {children}
    </tr>
  );
}

export default TableRow;
