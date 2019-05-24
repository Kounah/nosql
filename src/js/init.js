(function(M) {
  window.shortcuts = [];

  document.addEventListener('DOMContentLoaded', function() {
    let carouselSliders = document.querySelectorAll('.carousel-slider');
    let carouselSliderInstances = M.Carousel.init(carouselSliders, {
      fullWidth: true,
      indicators: true,
    });

    carouselSliderInstances.forEach(slider => {
      slider.el.style.height = window.innerHeight + 'px';

      window.addEventListener('resize', function() {
        slider.el.style.height = window.innerHeight + 'px';
      });

      Array.prototype.slice.call(slider.el.querySelectorAll('.next')).forEach(elem => {
        elem.addEventListener('click', function() { slider.next(); });
      });
      Array.prototype.slice.call(slider.el.querySelectorAll('.prev')).forEach(elem => {
        elem.addEventListener('click', function() { slider.prev(); });
      });
    });

    let shortcutElements = Array.prototype.slice.call(document.querySelectorAll('[shortcut]'));
    shortcutElements.forEach(element => {
      let attr = element.getAttribute('shortcut');
      attr.split(' ').map(shortcutString => {
        let modifiers = shortcutString.split('+');
        return {
          key: {
            code: modifiers.pop(),
            shift: modifiers.includes('shift'),
            control: modifiers.includes('control') || modifiers.includes('ctrl'),
            alt: modifiers.includes('alt'),
            meta: modifiers.includes('meta')
          },
          element: element
        };
      }).forEach(shortcut => window.shortcuts.push(shortcut));
    });
  });

  window.addEventListener('keydown', function (event) {
    window.shortcuts.filter(shortcut => {
      return shortcut.key.code == event.code
        && shortcut.key.shift == event.shiftKey
        && shortcut.key.control == event.ctrlKey
        && shortcut.key.alt == event.altKey
        && shortcut.key.meta == event.metaKey;
    }).forEach(shortcut => {
      shortcut.element.click();
    });
  });
})(window.M);