function initCarousel() {
  let screenSlides = document.querySelector('.carousel__inner');
  let allSlides = document.querySelectorAll('.carousel__slide');
  let widthOneSlide = document.querySelector('.carousel__slide').offsetWidth;
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let valueTranslateX = 0;
  
  function checkArrow() {
    (valueTranslateX === 0) ?
      carouselArrowLeft.style.display = 'none' : carouselArrowLeft.style.display = '';
  
    (valueTranslateX === -(widthOneSlide * allSlides.length - widthOneSlide)) ?
      carouselArrowRight.style.display = 'none' : carouselArrowRight.style.display = '';
  }

  carouselArrowLeft.addEventListener('click', () => {
    valueTranslateX += widthOneSlide;
    screenSlides.style.transform = `translateX(${valueTranslateX}px)`;
    checkArrow()
  });

  carouselArrowRight.addEventListener('click', () => {
    valueTranslateX -= widthOneSlide;
    screenSlides.style.transform = `translateX(${valueTranslateX}px)`;
    checkArrow()
  });
  
  checkArrow();
}