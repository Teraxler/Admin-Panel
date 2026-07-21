import TableRow from "./TableRow";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ children, columns }) {
  return (
    <div className="overflow-x-auto scroll-thin">
      <table className="text-sm lg:text-base w-full text-center rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </table>
    </div>
  );
}

export default Table;
