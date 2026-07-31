import { isDateMatch } from "./dateTimeUtil";
import { isIncludes, isStartsWith, normalizeText } from "./stringUtil";

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

const searchUser = (users = [], param) => {
  if (param.trim() === "") return users;

  return users?.filter((user) => {
    const isNameMatch = isStartsWith(user.name, param);
    const isFamilyMatch = isStartsWith(user.family, param);
    const isUsernameMatch = isStartsWith(user.username, param);

    const isFullNameMatch = isStartsWith(`${user.name} ${user.family}`, param);

    return isNameMatch || isFamilyMatch || isUsernameMatch || isFullNameMatch;
  });
};

const searchOrder = (orders = [], param) => {
  if (param.trim() === "") return orders;

  return orders?.filter((order) => {
    const isUserNameMatch = isStartsWith(order.userName, param);
    const isUserFamilyMatch = isStartsWith(order.userFamily, param);
    const isStatusMatch = order.status === normalizeText(param);
    const isOrderDateMatch = isDateMatch(order.createdAt, param);
    const isAddressMatch = isIncludes(order.deliveredAddress, param);

    const isUserFullNameMatch = isStartsWith(
      `${order.userName} ${order.userFamily}`,
      param,
    );

    return (
      isUserNameMatch ||
      isUserFamilyMatch ||
      isAddressMatch ||
      isUserFullNameMatch ||
      isStatusMatch ||
      isOrderDateMatch
    );
  });
};

const searchCategory = (categories = [], param) => {
  if (param.trim() === "") return categories;

  return categories?.filter((category) => isIncludes(category.name, param));
};

export { searchCategory, searchOrder, searchProduct, searchUser };
