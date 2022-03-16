function ucFirst(str) {
  let res = '';
  if(str != '') {
    res = str[0].toUpperCase() + str.slice(1);
  }
  return res;
}