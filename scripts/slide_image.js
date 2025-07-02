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

  // Сохраняем индекс текущего слайда в localStorage
  localStorage.setItem('currentSlide', newSlideIndex);
}

// Восстанавливаем индекс слайда при загрузке страницы
window.onload = function() {
  var slides = document.querySelectorAll('.carousel .slide');
  var savedSlideIndex = localStorage.getItem('currentSlide');

  if (savedSlideIndex !== null) {
    // Убираем класс 'active' с текущего слайда
    slides.forEach(slide => slide.classList.remove('active'));

    // Восстанавливаем слайд, который был сохранен
    slides[savedSlideIndex].classList.add('active');
  } else {
    // Если сохраненный слайд не найден, устанавливаем первый слайд как активный
    slides[0].classList.add('active');
  }
};

