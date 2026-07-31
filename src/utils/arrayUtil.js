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

export { generateNumbers, removeItemFromList };
