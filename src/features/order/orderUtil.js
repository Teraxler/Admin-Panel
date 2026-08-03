const claculateTotalPrice = (items = []) => {
  return items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
};

export { claculateTotalPrice };
