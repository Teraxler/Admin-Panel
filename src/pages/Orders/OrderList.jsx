import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Table from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";
import { API_URL, ITEMS_PER_PAGE } from "../../constants";
import { toast } from "sonner";
import { removeItemFromList, searchOrder } from "../../utils/array.util";
import TableRowOrder from "../../components/Table/TableRowOrder";
import Breadcrumb from "../../components/Breadcrumb";
import SearchBar from "../../components/Searchbar";
import Pagination from "../../components/Pagination/Pagination";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPageOrders, setCurrentPageOrders] = useState([]);
  const [orders, isOrdersLoaded, error, setOrders] = useFetch(
    `${API_URL}/orders`
  );

  async function deleteOrderHandler(orderId) {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setOrders((prevOrders) => removeOrderById(prevOrders, orderId));
      toast.success("Order delete successfully");
    } catch (error) {
      toast.error("Something is wrong please try again");
    }
  }

  useEffect(() => {
    if (location.state) {
      toast.success(location.state.message);

      navigate(location.pathname, { replace: true, state: null });
    }
  }, []);

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
                  number={i + 1}
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
        </div>
        {filteredOrders?.length ? (
          <Pagination
            items={filteredOrders}
            itemsPerPage={ITEMS_PER_PAGE}
            setCurrentPageItems={setCurrentPageOrders}
          />
        ) : null}
      </section>
    </>
  );
}

export default OrderList;
