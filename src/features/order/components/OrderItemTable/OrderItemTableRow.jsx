import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/constants";

function OrderItemTableRow({
  productId,
  quantity,
  unitPrice,
  productName,
  productCover,
  number,
}) {
  return (
    <tr className="*:px-2 *:sm:px-4 *:lg:px-6 *:py-2 capitalize">
      <td>
        <span className="line-clamp-1">{number}</span>
      </td>
      <td>
        <div className="flex items-center justify-center size-12 sm:size-15 lg:size-18 mx-auto">
          <Image
            width={60}
            height={60}
            className="max-h-full rounded-lg"
            alt={productName}
            src={`${BASE_URL}/images/products/${productCover}`}
          />
        </div>
      </td>
      <td>
        <Link href={`/products/${productId}`}>
          <span
            className="line-clamp-1 capitalize min-w-30"
            title={productName}
          >
            {productName}
          </span>
        </Link>
      </td>
      <td>
        <span className="line-clamp-1">{quantity}</span>
      </td>
      <td>
        <span className="line-clamp-1">${unitPrice}</span>
      </td>
      <td>
        <span className="line-clamp-1">${unitPrice * quantity}</span>
      </td>
    </tr>
  );
}

export default OrderItemTableRow;
