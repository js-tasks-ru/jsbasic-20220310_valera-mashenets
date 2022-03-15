function factorial(n) {
  // ваш код...
  let temp = 1;
  if(n > 1) {
    for(let i = n; i > 1; i--) {
      temp *= i;
    }
  }
  return temp;
}

