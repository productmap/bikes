import "./index.scss";
import "../utils/menu";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Subscribe from "../components/Subscribe";
import { validationConfig } from "../utils/constants";
import { data } from "../utils/data";
import Roads from "../components/Roads";
import Bikes from "../components/Bikes";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
import 'swiper/css';
import 'swiper/css/bundle';



// Переключатель темы
const theme = new ThemeSwitcher(".theme__toggle");
const themeSwitcherList = document.querySelectorAll(".theme__toggle");

themeSwitcherList.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    theme.toggleTheme();
  });
});


// Слайдер трасс
new Roads("#roads", {
  sliderSlider: ".roads__slider",
  sliderWrapper: ".roads__slider-wrapper",
  slideImage: ".roads__slide",
  controlsButtons: ".slider__btn",
  data: data,
});


// Селектор байков
new Bikes("#bikes-types", {
  container: ".bikes__slider-wrapper",
  card: "bikes__card",
  cardImage: "bikes__image",
  cardDescription: "bikes__description",
  data: data
});


// Слайдер байков
new Swiper(".bikes__slider", {
  slideClass:"bikes__card",
  wrapperClass:"bikes__slider-wrapper",
  // slidesPerView: "1",
  spaceBetween: 30,
  slidesPerView: "auto",
  grabCursor: true,
  modules: Navigation,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // breakpoints: {
  //   360: {
  //     slidesPerView: 1
  //   },
  //   500: {
  //     slidesPerView: 2
  //   },
  //   1000: {
  //     slidesPerView: 3
  //   }
  // }
});

const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});


/** Подписка */
new Subscribe(validationConfig);
