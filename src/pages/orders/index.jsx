import { useState } from "react";
import { searchOrder } from "@/utils/searchUtil";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { OrderTable } from "@/features/order/components";
import { getAllOrders } from "@/features/order/orderService";

export const getServerSideProps = async () => {
  const orders = await getAllOrders();

  return {
    props: { orders },
  };
};

function OrderListPage({ orders }) {
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
            isItemsLoaded={true}
            setFilteredItems={setFilteredOrders}
            placeholder="Search (user, date ,status)"
          />
        </div>
        <OrderTable
          orders={filteredOrders}
          setOrders={setFilteredOrders}
          isOrdersLoaded={true}
        />
      </section>
    </>
  );
}

export default OrderListPage;
