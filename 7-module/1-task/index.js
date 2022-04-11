import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.handler();
  }

  render() {
    const html = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`);

    const innerElement = html.querySelector('.ribbon__inner');  
    for (let i = 0; i < this.categories.length; i++) {
      let a = createElement(`<a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>`);
      innerElement.appendChild(a);
    }
    innerElement.querySelectorAll('.ribbon__item')[0].classList.add('ribbon__item_active');
    return html;
  }

  handler() {
    let innerElement = this.elem.querySelector('.ribbon__inner');
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.ribbon__arrow_right')) {
        innerElement.scrollBy(350, 0);
      }

      if (event.target.closest('.ribbon__arrow_left')) {
        innerElement.scrollBy(-350, 0);
      }
    });

    innerElement.addEventListener('scroll', (event) => {
      if (innerElement.scrollLeft === 0) {
        this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      } else {
        this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      }

      let scrollRight = innerElement.scrollWidth - innerElement.scrollLeft - innerElement.clientWidth;
      if(scrollRight < 1) {
        this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      } else {
        this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }
    });

    innerElement.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.closest('.ribbon__item')) {
        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');

        let idCategory = event.target.getAttribute('data-id');
        let eventCustom = new CustomEvent('ribbon-select', {
          detail: idCategory,
          bubbles: true
        });
        this.elem.dispatchEvent(eventCustom);
      }
    });
  }
}
