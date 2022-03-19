function isEmpty(obj) {
  let res = true;
  for (let key in obj) {
    res = false;
  }
  return res;
}
