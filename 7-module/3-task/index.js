import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {
      steps,
      value,
    };
    this.elem = this.render();
    this.handlers();
  }

  render() {
    const tmpl = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps">
        </div>
      </div>`);
      let sliderSteps = tmpl.querySelector('.slider__steps');
      for(let i = 0; i < this.config.steps; i++) {
        let spanGen;
        if (i === 0) {
          spanGen = createElement(`<span class="slider__step-active"></span>`);
        } else {
          spanGen = createElement(`<span></span>`);
        }
        sliderSteps.appendChild(spanGen);
      }
      
      return tmpl;
  }

  handlers() {
    this.elem.addEventListener('click', (event) => {
      let sliderSpans = this.elem.querySelector('.slider__steps');
      let sliders = sliderSpans.querySelectorAll('span');
      for(let item of sliders) {
        if (item.classList.contains('slider__step-active')) {
          item.classList.remove('slider__step-active');
        }
      }

      let xClick= event.clientX - this.elem.getBoundingClientRect().left;
      let xClickRelative = xClick / this.elem.offsetWidth;
      let value = Math.round(xClickRelative * (this.config.steps - 1));
      let valuePercent = value / (this.config.steps - 1) * 100;
      
      this.elem.querySelector('.slider__value').textContent = value;
      sliderSpans.querySelectorAll('span')[value].classList.add('slider__step-active');

      let sliderThumb = this.elem.querySelector('.slider__thumb');
      let sliderProgress = this.elem.querySelector('.slider__progress');
      sliderThumb.style.left = `${valuePercent}%`;
      sliderProgress.style.width = `${valuePercent}%`;

      let objectEvent = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      });

      this.elem.dispatchEvent(objectEvent);
    });
  }
}
