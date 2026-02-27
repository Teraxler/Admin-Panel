import { API_URL } from "@/constants";
import { useFetch } from "@/hooks/useFetch";
import { useToastMessage } from "@/hooks/useToastMessage";
import Head from "@/components/common/Head";
import Breadcrumb from "@/components/Breadcrumb";
import Table from "@/components/Table/Table";
import ColumnChart from "@/components/Charts/ColumnChart";
import TableRowOrder from "@/components/Table/TableRowOrder";
import CircularGaugeChart from "@/components/Charts/CircularGaugeChart";
import Loader from "@/components/Loader";

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

const Dashboard = () => {
  useToastMessage();
  const { data: recentOrders, isLoaded } = useFetch(`${API_URL}/orders`);

  if (!isLoaded) return <Loader />;

  return (
    <>
      <Head>
        <title>Admin Panel - Dashboard</title>
      </Head>

      <div>
        <h1 className="title">Dashboard</h1>
        <Breadcrumb />
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 py-5 px-6 rounded-lg bg-white mt-8 *:nth-1:border-b md:*:nth-1:border-b-0 *:nth-2:border-b md:*:nth-2:border-b-0 *:nth-2:border-e-0 md:*:nth-2:border-e divide-x divide-black/15">
        <div className="text-center p-2 md:p-0">
          <span className="text-2xl lg:text-[28px]/[130%] font-semibold lg:font-bold block">
            75K
          </span>
          <h4 className="text-slate-grey">Sale</h4>
        </div>
        <div className="text-center p-2 md:p-0">
          <span className="text-2xl lg:text-[28px]/[130%] font-semibold lg:font-bold block">
            80K
          </span>
          <h4 className="text-slate-grey">Users</h4>
        </div>
        <div className="text-center p-2 md:p-0">
          <span className="text-2xl lg:text-[28px]/[130%] font-semibold lg:font-bold block">
            120
          </span>
          <h4 className="text-slate-grey">Products</h4>
        </div>
        <div className="text-center p-2 md:p-0">
          <span className="text-2xl lg:text-[28px]/[130%] font-semibold lg:font-bold block">
            12K
          </span>
          <h4 className="text-slate-grey">Orders</h4>
        </div>
      </section>

      <div className="flex flex-wrap lg:flex-nowrap gap-5 mt-5">
        <section className="p-4 md:p-8 pb-4 bg-white rounded-lg min-w-70 w-full lg:w-1/4">
          <div className="mb-10">
            <h3 className="text-xl font-medium">Daily Orders Status</h3>
          </div>
          <CircularGaugeChart />
        </section>
        <section className="p-4 md:p-8 pb-4 bg-white rounded-lg w-full lg:w-3/4 overflow-x-auto">
          <div className="mb-10">
            <h3 className="text-xl font-medium">Monthly Sales</h3>
          </div>
          <div className="overflow-x-auto scroll-thin">
            <div className="min-w-104 max-w-250 mx-auto overflow-auto relative z-0">
              <ColumnChart />
            </div>
          </div>
        </section>
      </div>

      <section className="mt-5 bg-white rounded-lg">
        <div className="mb-5 p-2 sm:p-4">
          <h3 className="text-xl font-medium">Recent Orders</h3>
        </div>
        <div className="p-2 sm:p-4">
          {isLoaded && recentOrders?.length ? (
            <Table columns={tableColumns}>
              {recentOrders
                .reverse()
                .slice(0, 5)
                .map((order, i) => (
                  <TableRowOrder
                    key={order.orderId}
                    number={i + 1}
                    {...order}
                    noAction
                  />
                ))}
            </Table>
          ) : (
            <span className="h-20 block leading-20 text-center">
              No Order Found!!!
            </span>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
