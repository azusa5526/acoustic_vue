window.onload = function () {
  if (document.querySelector('.index')) {
    const nav = document.querySelector('.header .navbar');
    const navLink = document.querySelectorAll('.header .navbar a');
    const navIcon = document.querySelector('.header h1 a');
    const navToggleIcon = document.querySelector('.header .navbar-toggler i');
    // eslint-disable-next-line no-unused-vars
    let lastScrollY = 0;

    window.addEventListener('scroll', function () {
      const st = this.scrollY;
      if (st < 5) {
        nav.classList.remove('bg-white', 'shadowBottom');
        nav.classList.add('bg-transparent');

        navIcon.classList.add('whiteIcon');
        navIcon.classList.remove('blackIcon');

        navToggleIcon.classList.add('text-secondary');
        navToggleIcon.classList.remove('text-primary');

        navLink.forEach(function (item) {
          item.classList.add('text-white');
          item.classList.remove('text-primary');
        });
      } else {
        nav.classList.remove('bg-transparent');
        nav.classList.add('bg-white', 'shadowBottom');

        navToggleIcon.classList.add('text-primary');
        navToggleIcon.classList.remove('text-secondary');

        navIcon.classList.add('blackIcon');
        navIcon.classList.remove('whiteIcon');

        navLink.forEach(function (item) {
          item.classList.add('text-primary');
          item.classList.remove('text-white');
        });
      }
      lastScrollY = st;
    });
  }
};
