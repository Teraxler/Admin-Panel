import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { API_URL } from "@/constants";
import { formattingPhone } from "@/utils/string.util";
import { generateNumbers } from "@/utils/array.util";
import { formattingDateTime, normalizeDateTime } from "@/utils/dateTime.util";
import { useFetch } from "@/hooks/useFetch";
import Head from "@/components/common/Head";
import Table from "@/components/Table/Table";
import Breadcrumb from "@/components/Breadcrumb";
import Skeleton from "@/components/Skeleton/Skeleton";
import TableRowOrderItem from "@/components/Table/TableRowOrderItem";
import TableRowOrderItemSkeleton from "@/components/Skeleton/TableRowOrderItemSkeleton";

const tableColumns = ["#", "Cover", "Name", "Quantity", "Unit Price", "Total"];

const statusColor = {
  canceled: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
  "in progress": "bg-blue-100 text-blue-700",
};

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoaded: isOrderLoaded } = useFetch(
    `${API_URL}/orders/${orderId}`,
  );

  useEffect(() => {
    if (!isOrderLoaded) return;

    if (order == null) {
      navigate("/orders", {
        state: { message: "Order ID is invalid!", messageType: "error" },
      });
    }
  }, [isOrderLoaded]);

  const normalizedDateTime = normalizeDateTime(order?.createdAt);
  const formatedDateTime = formattingDateTime(normalizedDateTime);

  const claculateTotalPrice = (items) => {
    return items?.length
      ? items.reduce((prevValue, currentValue) => {
          return prevValue + currentValue.unitPrice * currentValue.quantity;
        }, 0)
      : 0;
  };

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
              {isOrderLoaded ? (
                <span className="line-clamp-1">{`${formatedDateTime?.monthName} ${formatedDateTime?.day}, ${formatedDateTime?.year}`}</span>
              ) : (
                <Skeleton className="w-26.25 lg:w-30 skeleton--text mr-0 my-auto" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Address:</span>

              {isOrderLoaded ? (
                <span className="line-clamp-1" title={order?.deliveredAddress}>
                  {order?.deliveredAddress}
                </span>
              ) : (
                <Skeleton className="w-40 lg:w-50 skeleton--text mr-0 my-auto" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Status:</span>
              {isOrderLoaded ? (
                <span
                  className={`line-clamp-1 w-max py-0.5 px-2 my-auto rounded-lg ${statusColor[order?.status]}`}
                >
                  {order?.status}
                </span>
              ) : (
                <Skeleton className="w-21.25 lg:w-24.25 skeleton--text my-1.25 lg:my-1.5 mr-0" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Discount:</span>
              {isOrderLoaded ? (
                <span>{`${order?.discountPercent}%`}</span>
              ) : (
                <Skeleton className="w-6 lg:w-7 skeleton--text mr-0 my-auto" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium text-nowrap">
                Total Price:
              </span>
              {isOrderLoaded ? (
                <span>{`$${claculateTotalPrice(order?.orderItems)}`}</span>
              ) : (
                <Skeleton className="w-8.75 lg:w-10 skeleton--text mr-0 my-auto" />
              )}
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
              {isOrderLoaded ? (
                <Link
                  className="capitalize line-clamp-1"
                  to={`/users/${order?.userId}`}
                >
                  {order?.userName} {order?.userFamily}
                </Link>
              ) : (
                <Skeleton className="w-26 lg:w-30 skeleton--text mr-0 my-auto" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Username:</span>
              {isOrderLoaded ? (
                <span className="line-clamp-1">{order?.userUsername}</span>
              ) : (
                <Skeleton className="w-17.5 lg:w-20 skeleton--text mr-0 my-auto" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Email:</span>
              {isOrderLoaded ? (
                <span className="line-clamp-1">{order?.userEmail}</span>
              ) : (
                <Skeleton className="w-41 lg:w-50 skeleton--text mr-0 my-auto" />
              )}
            </div>
            <div className="flex justify-between gap-x-2.5">
              <span className="text-secondary font-medium">Phone:</span>
              {isOrderLoaded ? (
                <span className="capitalize line-clamp-1">
                  {order?.userPhone ? formattingPhone(order?.userPhone) : "___"}
                </span>
              ) : (
                <Skeleton className="w-24 lg:w-27 skeleton--text mr-0 my-auto" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 bg-white rounded-lg mt-4 sm:mt-5">
        <h3 className="text-xl font-medium">Order Items</h3>
        <div className="mt-5">
          <Table columns={tableColumns}>
            {isOrderLoaded
              ? order?.orderItems.map((orderItem, i) => (
                  <TableRowOrderItem
                    key={orderItem.orderItemId}
                    number={i + 1}
                    {...orderItem}
                  />
                ))
              : generateNumbers(5, 1).map((number) => (
                  <TableRowOrderItemSkeleton key={number} />
                ))}
          </Table>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
