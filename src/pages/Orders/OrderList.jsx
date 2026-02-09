import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import { removeItemFromList, searchOrder } from "@/utils/array.util";
import useFetch from "@/hooks/useFetch";
import { useTitle } from "@/hooks/useTitle";
import { useToastMessage } from "@/hooks/useToastMessage";
import Table from "@/components/Table/Table";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";
import TableRowOrder from "@/components/Table/TableRowOrder";

const tableColumns = [
  "#",
  "Customer",
  "Date",
  "Address",
  "Discount",
  "Items",
  "Total",
  "Status",
  "",
];

const removeOrderById = (orders, id) =>
  removeItemFromList(orders, "orderId", id);

function OrderList() {
  useTitle("Admin Panel - Orders");
  useToastMessage();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);

  const { data: orders, isLoaded: isOrdersLoaded } = useFetch(
    `${API_URL}/orders`,
  );

  const calcItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function deleteOrderHandler(orderId) {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setFilteredOrders((prevOrders) => removeOrderById(prevOrders, orderId));
      toast.success("Order delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  return (
    <>
      <div>
        <h1 className="title">Orders</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link
            to={""}
            className="flex items-center justify-center gap-x-1 lg:gap-x-2 size-9.5 sm:w-auto p-2 lg:p-2.5 bg-white hover:bg-full-spectrum-blue text-full-spectrum-blue hover:text-white text-sm font-medium uppercase border border-full-spectrum-blue rounded-lg transition"
          >
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="text-sm lg:text-base hidden sm:inline">
              New Order
            </span>
          </Link>
          <SearchBar
            items={orders}
            searchHandler={searchOrder}
            isItemsLoaded={isOrdersLoaded}
            setFilteredItems={setFilteredOrders}
            placeholder="Search (customer, date ,status)"
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          {isOrdersLoaded && filteredOrders?.length ? (
            <Table columns={tableColumns}>
              {currentPageOrders.map((order, i) => (
                <TableRowOrder
                  key={order.orderId}
                  number={calcItemNumber(i)}
                  onDelete={() => deleteOrderHandler(order.orderId)}
                  {...order}
                />
              ))}
            </Table>
          ) : (
            <span className="h-20 block leading-20 text-center">
              No Order Found!!!
            </span>
          )}
          {filteredOrders?.length ? (
            <Pagination
              items={filteredOrders}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPageItems={setCurrentPageOrders}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}

export default OrderList;
