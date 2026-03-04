import Skeleton from "@/components/Skeleton/Skeleton";

const TableRowOrderSkeleton = ({ noAction = false }) => {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2">
      <td>
        <Skeleton className="w-5 lg:w-6 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-26.25 lg:w-30 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-17.5 lg:w-20 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-43.75 lg:w-50 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-5 lg:w-6 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-5 lg:w-6 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-7 lg:w-8 skeleton--text" />
      </td>
      <td>
        <Skeleton className="w-21.25 lg:w-24.25 skeleton--text my-1.25 lg:my-1.5" />
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
