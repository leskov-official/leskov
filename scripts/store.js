  document.querySelectorAll('.color-options').forEach(optionGroup => {
    const productId = optionGroup.dataset.product;
    const buyButton = document.getElementById(productId + '-buy');
    const imageContainer = document.getElementById(productId + '-images');
    const primaryImg = imageContainer.querySelector('.img-primary');
    const hoverImg = imageContainer.querySelector('.img-hover');

    const saved = localStorage.getItem('product-' + productId);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const dots = optionGroup.querySelectorAll('.color-dot');
        dots.forEach(d => d.classList.remove('selected'));

        dots.forEach(dot => {
          if (dot.getAttribute('data-url') === data.url) {
            dot.classList.add('selected');
            buyButton.setAttribute('href', data.url);
            primaryImg.setAttribute('src', data.imgFront);
            hoverImg.setAttribute('src', data.imgBack);
          }
        });
      } catch (e) {
        console.error("Ошибка загрузки цвета из localStorage:", e);
      }
    }

    optionGroup.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {

        optionGroup.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
        dot.classList.add('selected');

        const url = dot.getAttribute('data-url');
        const imgFront = dot.getAttribute('data-img-front');
        const imgBack = dot.getAttribute('data-img-back');

        buyButton.setAttribute('href', url);
        primaryImg.setAttribute('src', imgFront);
        hoverImg.setAttribute('src', imgBack);

        const state = { url, imgFront, imgBack };
        localStorage.setItem('product-' + productId, JSON.stringify(state));
      });
    });
  });
