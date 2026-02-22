function Table({ children, columns }) {
  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="text-sm lg:text-base w-full text-center">
        <thead className="">
          <tr className="text-secondary *:font-medium *:not-last:border-r *:border-r-neutral-200">
            {columns.map((col) => (
              <th className="px-2 sm:px-4 lg:px-6 py-2.5" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y *:divide-x divide-neutral-200 *:divide-neutral-200 *:odd:bg-neutral-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
