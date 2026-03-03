import Skeleton from "@/components/Skeleton/Skeleton";

const TableRowProductSkeleton = () => {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2 capitalize">
      <td>
        <Skeleton className="w-6 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="size-12 sm:size-15 lg:size-18 rounded" />
      </td>
      <td>
        <Skeleton className="w-25 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="min-w-25 sm:min-w-37.5 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-25 sm:w-37.5 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-5 sm:w-6 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <Skeleton className="w-5 sm:w-6 h-3.5 sm:h-4 rounded" />
      </td>
      <td>
        <div className="flex justify-center gap-x-2 *:mx-0">
          <Skeleton className="size-9 lg:size-10 rounded-lg" />
          <Skeleton className="size-9 lg:size-10 rounded-lg" />
        </div>
      </td>
    </tr>
  );
};

export default TableRowProductSkeleton;
