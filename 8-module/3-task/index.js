export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === null || arguments.length === 0) return;

    let isStock = false;
    let indexRepeat;
    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].product.id === product.id) {
        isStock = true;
        indexRepeat = i;
        break;
      }
    }
    
    if (!isStock) {
      let newProduct = {
        product: product,
        count: 1,
      }
      this.cartItems.push(newProduct);
    } else {
      this.cartItems[indexRepeat].count++;
    }

    this.onProductUpdate(this.cartItem);
  }

  updateProductCount(productId, amount) {
    let indexId;
    for(let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].product.id === productId) {
        indexId = i;
      }
    }

    if(amount === 1) {
      this.cartItems[indexId].count++;
    } 
    
    if (amount === -1) {
      this.cartItems[indexId].count--;
      if (this.cartItems[indexId].count === 0) {
        this.cartItems.splice(indexId, 1)
      }
    }
    this.getTotalPrice()
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    if(this.cartItems.length > 0) {
      return false;
    } else return true;
  }

  getTotalCount() {
    let totalCount = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      totalPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

