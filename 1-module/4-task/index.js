function checkSpam(str) {
  let resoult = false;
  if (str.toLowerCase().includes('1xbet') || str.toLowerCase().includes('xxx')) {
    resoult = true;
  }
  return resoult;
}
