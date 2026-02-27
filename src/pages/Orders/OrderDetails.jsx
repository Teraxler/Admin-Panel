import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { API_URL } from "@/constants";
import { phoneFormat } from "@/utils/string.util";
import { formattingDateTime, normalizeDateTime } from "@/utils/dateTime";
import { useFetch } from "@/hooks/useFetch";
import Head from "@/components/common/Head";
import Table from "@/components/Table/Table";
import Breadcrumb from "@/components/Breadcrumb";
import TableRowOrderItem from "@/components/Table/TableRowOrderItem";
import Loader from "@/components/Loader";

const tableColumns = ["#", "Cover", "Name", "Quantity", "Unit Price", "Total"];

const statusColor = {
  canceled: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
  "in progress": "bg-blue-100 text-blue-700",
};

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoaded } = useFetch(`${API_URL}/orders/${orderId}`);

  useEffect(() => {
    if (!isLoaded) return;

    if (order == null) {
      navigate("/orders", {
        state: { message: "Order ID is invalid!", messageType: "error" },
      });
    }
  }, [isLoaded]);

  const normalizedDateTime = normalizeDateTime(order?.createdAt);
  const formatedDateTime = formattingDateTime(normalizedDateTime);

  const calcTotalPrice = (items) => {
    return items?.length
      ? items.reduce((prevValue, currentValue) => {
          return prevValue + currentValue.unitPrice * currentValue.quantity;
        }, 0)
      : 0;
  };

  if (!isLoaded) return <Loader />;

  return (
    <>
      <Head>
        <title>Admin Panel - Order Details</title>
      </Head>
      <div>
        <h1 className="title">Order Details</h1>
        <Breadcrumb />
      </div>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 mt-5 text-sm lg:text-base">
        <div className="flex-1 p-2 sm:p-4 bg-white rounded-lg">
          <h3 className="text-xl font-medium">Order</h3>
          <div className="flex flex-col mt-5 *:last:min-h-5.75 *:last:sm:min-h-auto *:not-last:h-7.75 *:not-last:lg:h-9.25 *:not-last:pb-1.5 *:sm:not-last:pb-2 *:not-last:mb-1.5 *:sm:not-last:mb-2 divide-y divide-neutral-200">
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Data:</span>
              <span className="line-clamp-1">{`${formatedDateTime?.monthName} ${formatedDateTime?.day}, ${formatedDateTime?.year}`}</span>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Address:</span>
              <span className="line-clamp-1" title={order?.deliveredAddress}>
                {order?.deliveredAddress}
              </span>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Status:</span>
              <span
                className={`line-clamp-1 w-max py-0.5 px-2 rounded ${statusColor[order?.status]}`}
              >
                {order?.status}
              </span>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Discount:</span>
              <span>{order?.discountPercent}%</span>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium text-nowrap">
                Total Price:
              </span>
              <span>${calcTotalPrice(order?.orderItems)}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 p-2 sm:p-4 bg-white rounded-lg">
          <h3 className="text-xl font-medium">User</h3>
          <div className="flex flex-col mt-5 *:last:min-h-5.75 *:last:sm:min-h-auto *:not-last:h-7.75 *:not-last:lg:h-9.25 *:not-last:pb-1.5 *:sm:not-last:pb-2 *:not-last:mb-1.5 *:sm:not-last:mb-2 divide-y divide-neutral-200">
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium text-nowrap">
                Full Name:
              </span>
              <Link
                className="capitalize line-clamp-1"
                to={`/users/${order?.userId}`}
              >
                {order?.userName} {order?.userFamily}
              </Link>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Username:</span>
              <span className="line-clamp-1">{order?.userUsername}</span>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Email:</span>
              <span className="line-clamp-1">{order?.userEmail}</span>
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Phone:</span>
              <span className="capitalize line-clamp-1">
                {order?.userPhone ? phoneFormat(order?.userPhone) : "___"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 bg-white rounded-lg mt-4 sm:mt-5">
        <h3 className="text-xl font-medium">Order Items</h3>
        <div className="mt-5">
          <Table columns={tableColumns}>
            {isLoaded
              ? order?.orderItems.map((orderItem, i) => (
                  <TableRowOrderItem
                    key={orderItem.orderItemId}
                    number={i + 1}
                    {...orderItem}
                  />
                ))
              : null}
          </Table>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
