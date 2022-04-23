import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.exModal = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {
    if (product === null || arguments.length === 0) return;

    let isStock = false;
    let indexRepeat;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === product.id) {
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
    this.onProductUpdate(this.cartItems[this.cartItems.length - 1]);
  }

  updateProductCount(productId, amount) {
    let indexId;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === productId) {
        indexId = i;
      }
    }


    if (amount === 1) {
      this.cartItems[indexId].count++;
    }

    if (amount === -1) {
      this.cartItems[indexId].count--;
      if (this.cartItems[indexId].count === 0 && this.cartItems.length > 1) {
        this.onProductUpdate(this.cartItems[indexId]);
        this.cartItems.splice(indexId, 1);
      } else if (this.cartItems[indexId].count === 0 && this.cartItems.length === 1) {
        this.onProductUpdate(this.cartItems[indexId]);
        this.cartItems.splice(indexId, 1);
        this.exModal.close();
      }
    }

    this.getTotalPrice();
    this.onProductUpdate(this.cartItems[indexId]);
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    } else return true;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.exModal.setTitle('Your order');
    let htmpRend = createElement('<div></div>');

    for (let i = 0; i < this.cartItems.length; i++) {
      let prod = this.renderProduct(this.cartItems[i].product, this.cartItems[i].count);
      htmpRend.append(prod);
    }
    htmpRend.append(this.renderOrderForm());

    htmpRend.addEventListener('click', (event) => {
      let idProd;
      if (event.target.closest('.cart-counter__button_minus')) {
        idProd = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(idProd, -1);
      }

      if (event.target.closest('.cart-counter__button_plus')) {
        idProd = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(idProd, 1);
      }
    })

    htmpRend.querySelector('.cart-form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    })
    this.exModal.setBody(htmpRend);
    this.exModal.open();
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open') && cartItem !== undefined) {
      let prodId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body').querySelector('div');
      let productCount = modalBody.querySelector(`[data-product-id=${prodId}] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id=${prodId}] .cart-product__price`);
      let infoPrice = modalBody.querySelector('.cart-buttons__info-price');

      productCount.innerHTML = cartItem.count;

      let calcPrice = cartItem.product.price * cartItem.count;
      productPrice.innerHTML = `€${calcPrice.toFixed(2)}`;

      let totalPrice = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        totalPrice += this.cartItems[i].product.price * this.cartItems[i].count;
      }
      infoPrice.innerHTML = `€${totalPrice.toFixed(2)}`;

      if (cartItem.count === 0) {
        modalBody.querySelector(`[data-product-id=${prodId}]`).remove();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    let btn = document.querySelector('.btn-group__button');
    btn.classList.add('is-loading');
    let cartForm = document.querySelector('.cart-form');
    let req = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(cartForm),
    });
    req.then((resp) => {
      if(resp.status === 200) {
        document.querySelector('.modal__title').innerHTML = 'Success!';
        this.cartItems = [];
        let modalBody = document.querySelector('.modal__body');
        modalBody.firstChild.remove();
        let successMessage = createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>`);
        modalBody.append(successMessage);
        this.cartIcon.update(this);
      }
    })

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

