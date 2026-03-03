import Skeleton from "@/components/Skeleton/Skeleton";

const TableRowOrderSkeleton = ({ noAction = false }) => {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2">
      <td>
        <Skeleton className="w-6 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-30 h-3.5 rounded" />
      </td>
      <td>
        <Skeleton className="w-20 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-50 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-5 sm:w-6 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-5 sm:w-6 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-7 sm:w-8 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-21.75 sm:w-24.25 h-6 sm:h-7 rounded" />
      </td>
      {!noAction ? (
        <td>
          <div className="flex justify-center gap-x-2 *:mx-0">
            <Skeleton className="size-9 lg:size-10 rounded-lg" />
            <Skeleton className="size-9 lg:size-10 rounded-lg" />
          </div>
        </td>
      ) : null}
    </tr>
  );
};

export default TableRowOrderSkeleton;
