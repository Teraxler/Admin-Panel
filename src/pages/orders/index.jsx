import { useState } from "react";
import { searchOrder } from "@/utils/searchUtil";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { OrderTable } from "@/features/order/components";
import { getAllOrders } from "@/features/order/orderService";
import { useFetch } from "@/hooks/useFetch";

function OrderListPage() {
  const { data: orders, status: ordersStatus } = useFetch({
    fn: getAllOrders,
    dependencies: [],
  });

  const [filteredOrders, setFilteredOrders] = useState([]);

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
        <div className="flex justify-end mb-4">
          <SearchBar
            items={orders}
            handleSearch={searchOrder}
            isItemsLoaded={ordersStatus === "success"}
            setFilteredItems={setFilteredOrders}
            placeholder="Search (user, date ,status)"
          />
        </div>
        <OrderTable
          orders={filteredOrders}
          setOrders={setFilteredOrders}
          isOrdersLoaded={ordersStatus === "success"}
        />
      </section>
    </>
  );
}

export default OrderListPage;
