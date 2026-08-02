import { useState } from "react";
import { API_URL } from "@/constants";
import { searchOrder } from "@/utils/searchUtil";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import { SearchBar } from "@/components";
import { Head, Breadcrumb } from "@/components/ui";
import { OrderTable } from "../components";

function OrderListPage() {
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
        <div className="flex justify-end mb-4">
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

export default OrderListPage;
