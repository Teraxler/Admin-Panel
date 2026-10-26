const generateNumbers = (count, startPoint = 0) => {
  const result = [];
  for (let i = startPoint; i <= count; i++) {
    result.push(i);
  }
  return result;
};

function removeItemFromList(list = [], measure, id) {
  return list.filter((item) => item[measure] !== id);
}

function findItem(list = [], measure, id) {
  return list.find((item) => item[measure] === id);
}

function updateItem(list, measure, updatedItem) {
  return list.map((item) => {
    if (item[measure] === updatedItem.id) return updatedItem;
    return item;
  });
}

function deleteItem(list, measure, id) {
  return removeItemFromList(list, measure, id);
}

export {
  findItem,
  updateItem,
  deleteItem,
  generateNumbers,
  removeItemFromList,
};
