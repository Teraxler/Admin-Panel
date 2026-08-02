import { useState } from "react";
import { toast } from "sonner";
import { ITEMS_PER_PAGE } from "@/constants";
import { generateNumbers, removeItemFromList } from "@/utils/arrayUtil";
import { Pagination } from "@/components";
import { Table } from "@/components/ui";
import OrderTableRow from "./OrderTableRow";
import OrderTableRowSkeleton from "./OrderTableRowSkeleton";
import { deleteOrder } from "@/features/order/orderService";

const tableColumns = [
  "#",
  "User",
  "Date",
  "Address",
  "Discount",
  "Items",
  "Total",
  "Status",
];

const removeOrderById = (orders, id) =>
  removeItemFromList(orders, "orderId", id);

function OrderTable({ orders, setOrders, isOrdersLoaded, noAction }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);

  const calculateItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function handleDeleteOrder(orderId) {
    try {
      await deleteOrder(orderId);

      setOrders((prevOrders) => removeOrderById(prevOrders, orderId));

      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="p-2 sm:p-4 bg-white rounded-lg">
      <Table columns={tableColumns} noAction={noAction}>
        {isOrdersLoaded
          ? currentPageOrders.map((order, i) => (
              <OrderTableRow
                noAction={noAction}
                key={order.orderId}
                number={calculateItemNumber(i)}
                onDelete={() => handleDeleteOrder(order.orderId)}
                {...order}
              />
            ))
          : generateNumbers(5, 1).map((number) => (
              <OrderTableRowSkeleton noAction={noAction} key={number} />
            ))}
      </Table>
      <Pagination
        items={orders}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCurrentPageItems={setCurrentPageOrders}
      />

      {isOrdersLoaded && !currentPageOrders?.length ? (
        <span className="h-20 block leading-20 text-center">
          No Order Found!!!
        </span>
      ) : null}
    </div>
  );
}

export default OrderTable;
