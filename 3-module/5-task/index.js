function getMinMax(str) {
  let result = {};
  let strToArr = str.split(' ');
  let numberArr = [];
  
  for (let item of strToArr) {
    if(!isNaN(item)) {
      numberArr.push(Number(item));
    }
  }

  let min = numberArr[0];
  let max = numberArr[0];

  for(let i = 0; i < numberArr.length; i++) {
    if(numberArr[i] < min) {
      min = numberArr[i];
    }
    if(numberArr[i] > max) {
      max = numberArr[i];
    }
  }

  result.min = min;
  result.max = max;

  return result;
}
