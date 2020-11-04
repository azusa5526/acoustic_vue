/* eslint-disable no-unused-vars */
import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

const swiper1 = new Swiper('.swiper1', {
  loop: true,
  autoplay: { delay: 4000 },
  pagination: '.swiper-pagination1',
  paginationClickable: true
});
const swiper2 = new Swiper('.swiper2', {
  slidesPerView: '1',
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  autoplay: { delay: 3000 },
  pagination: '.swiper-pagination2',
  paginationClickable: true,
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    1200: {
      slidesPerView: 3.5,
      spaceBetween: 25
    }
  }
});
const galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true
});
const galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 10,
  thumbs: {
    swiper: galleryThumbs
  }
});
