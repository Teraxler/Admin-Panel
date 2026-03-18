import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { API_URL, ITEMS_PER_PAGE } from "@/constants";
import {
  generateNumbers,
  removeItemFromList,
  searchOrder,
} from "@/utils/array.util";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import Head from "@/components/common/Head";
import Table from "@/components/Table/Table";
import SearchBar from "@/components/SearchBar";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination/Pagination";
import TableRowOrder from "@/components/Table/TableRowOrder";
import TableRowOrderSkeleton from "@/components/Skeleton/TableRowOrderSkeleton";

const tableColumns = [
  "#",
  "User",
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
  useToastMessage();

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);

  const { data: orders, isLoaded: isOrdersLoaded } = useFetch(
    `${API_URL}/orders`,
  );

  const calculateItemNumber = (index) =>
    (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

  async function handleDeleteOrder(orderId) {
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
      <Head>
        <title>Admin Panel - Orders</title>
      </Head>

      <div>
        <h1 className="title">Orders</h1>
        <Breadcrumb />
      </div>
      <section className="mt-8">
        <div className="flex justify-between mb-4">
          <Link to={"/orders"} className="btn btn--small btn--primary">
            <svg className="size-4">
              <use href="#plus"></use>
            </svg>
            <span className="hidden sm:inline">New Order</span>
          </Link>
          <SearchBar
            items={orders}
            handleSearch={searchOrder}
            isItemsLoaded={isOrdersLoaded}
            setFilteredItems={setFilteredOrders}
            placeholder="Search (user, date ,status)"
          />
        </div>
        <div className="p-2 sm:p-4 bg-white rounded-lg">
          <Table columns={tableColumns}>
            {isOrdersLoaded
              ? currentPageOrders.map((order, i) => (
                  <TableRowOrder
                    key={order.orderId}
                    number={calculateItemNumber(i)}
                    onDelete={() => handleDeleteOrder(order.orderId)}
                    {...order}
                  />
                ))
              : generateNumbers(5, 1).map((number) => (
                  <TableRowOrderSkeleton key={number} />
                ))}
          </Table>
          <Pagination
            items={filteredOrders}
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
      </section>
    </>
  );
}

export default OrderList;
