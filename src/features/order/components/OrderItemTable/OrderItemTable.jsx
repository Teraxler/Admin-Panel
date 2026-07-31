import { generateNumbers } from "@/utils/arrayUtil";
import { Table } from "@/components/ui";
import OrderItemTableRow from "./OrderItemTableRow";
import OrderItemTableRowSkeleton from "./OrderItemTableRowSkeleton";

const tableColumns = ["#", "Cover", "Name", "Quantity", "Unit Price", "Total"];

function OrderItemTable({ orderItems, isOrderItemesLoaded }) {
  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg mt-4 sm:mt-5">
      <h3 className="text-xl font-medium">Order Items</h3>
      <div className="mt-5">
        <Table columns={tableColumns} noAction>
          {isOrderItemesLoaded
            ? orderItems?.map((orderItem, i) => (
                <OrderItemTableRow
                  key={orderItem.orderItemId}
                  number={i + 1}
                  {...orderItem}
                />
              ))
            : generateNumbers(5, 1).map((number) => (
                <OrderItemTableRowSkeleton key={number} />
              ))}
        </Table>
      </div>
    </div>
  );
}

export default OrderItemTable;
