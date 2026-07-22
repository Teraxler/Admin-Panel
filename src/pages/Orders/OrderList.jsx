import { useState } from "react";
import { Link } from "react-router";
import { API_URL } from "@/constants";
import { searchOrder } from "@/utils/array.util";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import { Head, SearchBar, Breadcrumb } from "@/components/ui";
import { OrderTable } from "@/features/order";

function OrderList() {
  useToastMessage();
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { data: orders, isLoaded: isOrdersLoaded } = useFetch(
    `${API_URL}/orders`,
  );

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
        <OrderTable
          orders={filteredOrders}
          setOrders={setFilteredOrders}
          isOrdersLoaded={isOrdersLoaded}
        />
      </section>
    </>
  );
}

export default OrderList;
