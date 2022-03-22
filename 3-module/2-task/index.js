function filterRange(arr, a, b) {
  let filtered = arr.filter((item) => {
    if(item >= a && item <= b) {
      return true;
    }
  });
  return filtered;
}
