function camelize(str) {
  let result = '';
  strDevide = str.split('');
  for(let i = 0; i < strDevide.length; i++) {
    if(strDevide[i] == '-') {
      strDevide[i + 1] = strDevide[i + 1].toUpperCase();
      strDevide.splice(i, 1);
    } 
  }
  result = strDevide.join('');

  return result;
}
