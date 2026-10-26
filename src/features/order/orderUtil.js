const claculateTotalPrice = (items = []) => {
  return items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
};

const claculateTotalItems = (items = []) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export { claculateTotalPrice, claculateTotalItems };
