import { formattingDateTime, isDateMatch, normalizeDateTime } from "./dateTime";
import { isIncludes, isStartsWith, normalizeText } from "./string.util";

const numberGenerator = (count, startPoint = 0) => {
  const result = [];
  for (let i = startPoint; i <= count; i++) {
    result.push(i);
  }
  return result;
};

const paginateItems = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;

  return items.slice(start, end);
};

function findProduct(list, productId) {
  return list.find((product) => product.productId === productId);
}

function increaseProductCount(list, productId) {
  return list.map((product) => {
    product.productId === productId &&
      product.inventory > product.count &&
      product.count++;

    return product;
  });
}

function decreaseProductCount(list, productId) {
  return list.reduce((list, product) => {
    product.productId === productId && product.count--;

    return product.count > 0 ? [...list, product] : [...list];
  }, []);
}

function isProductExists(list, productId) {
  return list.some((product) => product.productId === productId);
}

function filterProductsByCategory(products = [], category) {
  return products.filter(
    (product) => category == null || product.category === category
  );
}

const searchProduct = (products = [], param) => {
  if (param.trim() === "") return products;

  return products?.filter((product) => {
    const isNameMatch = isStartsWith(product.name, param);
    const isCategoryMatch = product.categoryName
      ? isStartsWith(product.categoryName, param)
      : false;

    return isNameMatch || isCategoryMatch;
  });
};

const searchCustomer = (customers = [], param) => {
  if (param.trim() === "") return customers;

  return customers?.filter((customer) => {
    const isNameMatch = isStartsWith(customer.name, param);
    const isFamilyMatch = isStartsWith(customer.family, param);
    const isUsernameMatch = isStartsWith(customer.username, param);

    const isFullNameMatch = isStartsWith(
      `${customer.name} ${customer.family}`,
      param
    );

    return isNameMatch || isFamilyMatch || isUsernameMatch || isFullNameMatch;
  });
};

const searchOrder = (orders = [], param) => {
  if (param.trim() === "") return orders;

  return orders?.filter((order) => {
    const isCustomerNameMatch = isStartsWith(order.customerName, param);
    const isCustomerFamilyMatch = isStartsWith(order.customerFamily, param);
    const isStatusMatch = order.status === normalizeText(param);
    const isOrderDateMatch = isDateMatch(order.createdAt, param);
    const isAddressMatch = isIncludes(order.deliveredAddress, param);

    const isCustomerFullNameMatch = isStartsWith(
      `${order.customerName} ${order.customerFamily}`,
      param
    );

    return (
      isCustomerNameMatch ||
      isCustomerFamilyMatch ||
      isAddressMatch ||
      isCustomerFullNameMatch ||
      isStatusMatch ||
      isOrderDateMatch
    );
  });
};

const searchCategory = (categories = [], param) => {
  if (param.trim() === "") return categories;

  return categories?.filter((category) => isIncludes(category.name, param));
};

function removeItemFromList(list = [], measure, id) {
  return list.filter((item) => item[measure] !== id);
}

export {
  findProduct,
  numberGenerator,
  increaseProductCount,
  decreaseProductCount,
  isProductExists,
  filterProductsByCategory,
  removeItemFromList,
  searchProduct,
  searchCustomer,
  searchCategory,
  searchOrder,
  paginateItems,
};
