function truncate(str, maxlength) {
  let resoult = str;
  if(str.length > maxlength) {
    resoult = str.slice(0, maxlength - 1) + '…';
  }
  return resoult;
}
