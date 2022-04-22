import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.tempProd = [];
    this.elem = this.render();
  }

  render() {
    let htmlTmpl = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `);
    let productInner = htmlTmpl.querySelector('.products-grid__inner');

    let isEmptyFilters = (() => {
      for (let item in this.filters) {
        return false;
      }
      return true;
    })();


    if (isEmptyFilters) {
      for (let i = 0; i < this.products.length; i++) {
        let cardItem = new ProductCard(this.products[i]);
        productInner.append(cardItem.elem);
      }
    }
    return htmlTmpl;
  }

  updateFilter(filters) {
    for (let item in filters) {
      this.filters[item] = filters[item];
    }

    this.tempProd = [];
    for (let i = 0; i < this.products.length; i++) {

      if (this.products[i].nuts === true && this.filters.noNuts === true) {
        continue;
      }

      if (this.filters.vegeterianOnly === true) {
        if (this.products[i].vegeterian === true) {
        } else continue;
      }

      if (this.products[i].spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (('category' in this.filters) && this.filters.category !== '') {
        if (this.products[i].category === this.filters.category) {
        } else continue;
      }

      this.tempProd.push(this.products[i]);
    }
    let prodInner = document.querySelector('.products-grid__inner');
    let cardsOld = prodInner.querySelectorAll('.card');
    for (let i = 0; i < cardsOld.length; i++) {
      cardsOld[i].remove();
    }

    for (let i = 0; i < this.tempProd.length; i++) {
      let cardItem = new ProductCard(this.tempProd[i]);
      prodInner.append(cardItem.elem);
    }
  }
}

