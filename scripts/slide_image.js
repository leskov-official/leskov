function changeSlide(direction) {
  var slides = document.querySelectorAll('.carousel .slide');
  var currentSlide = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  slides[currentSlide].classList.remove('active'); 

  var newSlideIndex = currentSlide + direction;
  if (newSlideIndex >= slides.length) {
    newSlideIndex = 0;
  } else if (newSlideIndex < 0) {
    newSlideIndex = slides.length - 1;
  }

  slides[newSlideIndex].classList.add('active'); 

  localStorage.setItem('currentSlide', newSlideIndex);
}

window.onload = function() {
  var slides = document.querySelectorAll('.carousel .slide');
  var savedSlideIndex = localStorage.getItem('currentSlide');

  if (savedSlideIndex !== null) {
    slides.forEach(slide => slide.classList.remove('active'));

    slides[savedSlideIndex].classList.add('active');
  } else {
    slides[0].classList.add('active');
  }
};

