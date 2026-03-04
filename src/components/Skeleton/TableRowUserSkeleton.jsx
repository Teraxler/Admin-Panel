import Skeleton from "@/components/Skeleton/Skeleton";

const TableRowUserSkeleton = () => {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2">
      <td>
        <Skeleton className="w-5 lg:w-6 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-26.5 lg:w-30 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-17.5 lg:w-20 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-30.5 lg:w-35 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-17.5 lg:w-20 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-17.5 lg:w-20 skeleton--text" />
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

export default TableRowUserSkeleton;
