const dots = document.getElementById('dots');
  let dotCount = 0;
  const dotInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4; // 0 → 1 → 2 → 3 → 0
    if (dots) dots.textContent = '.'.repeat(dotCount);
  }, 400);

  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = ''; 
        clearInterval(dotInterval); 
      }, 500);
    }
  });
