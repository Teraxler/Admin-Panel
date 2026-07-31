const claculateTotalPrice = (items) => {
  return items?.length
    ? items.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.unitPrice * currentValue.quantity;
      }, 0)
    : 0;
};

export { claculateTotalPrice };
