import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.switchSlides(this.elem);
    this.clickAdd(this.elem);
  }

  render() {
    let html = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          </div>
        </div>
      </div>`);

    for (let i = 0; i < this.slides.length; i++) {
      let slideHtml = createElement(`
        <div class="carousel__slide" data-id="${this.slides[i].id}">
          <img src="/assets/images/carousel/${this.slides[i].image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${this.slides[i].price.toFixed(2)}</span>
            <div class="carousel__title">${this.slides[i].name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
        </div>`);
      html.querySelector('.carousel__inner').appendChild(slideHtml);
    }
    return html;
  }

  switchSlides(dom) {
    let innerSlide = dom.querySelector('.carousel__inner');
    let arrowLeft = dom.querySelector('.carousel__arrow_left');
    let arrowRight = dom.querySelector('.carousel__arrow_right');
    let amountSlide = this.slides.length;
    let currentSlide = 0;
    let allSlides = dom.querySelectorAll('.carousel__slide');

    dom.addEventListener('click', ({ target }) => {
      if (target.closest('.carousel__arrow_left')) {
        prevSlide();
      }

      if (target.closest('.carousel__arrow_right')) {
        nextSlide();
      }
    });

    function prevSlide() {
      currentSlide--;
      position();
    }

    function nextSlide() {
      currentSlide++;
      position();
    }

    function position() {
      let widthCurrentSlide = allSlides[currentSlide].offsetWidth;
      let calcPosition = -widthCurrentSlide * currentSlide;
      innerSlide.style.transform = `translatex(${calcPosition}px)`;

      if(currentSlide == 0) {
        arrowLeft.style.display = 'none';
      } else {
        arrowLeft.style.display = '';
      }

      if (currentSlide == amountSlide - 1) {
        arrowRight.style.display = 'none';
      } else {
        arrowRight.style.display = '';
      }
    }
    position();
  }

  clickAdd(dom) {
    dom.addEventListener('click', (event) => {
      if (event.target.className === 'carousel__button' || event.target.closest('.carousel__button')) {
        let getIdSlide = event.target.closest('.carousel__slide').getAttribute('data-id');
        let getEvent = new CustomEvent("product-add", {
          detail: getIdSlide,
          bubbles: true 
        });
        dom.dispatchEvent(getEvent);
      }
    });
  }
}
