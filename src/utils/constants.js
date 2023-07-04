export const page = document.querySelector(".page"),
  menuLinks = document.querySelectorAll(".menu__link"),
  menuToggle = document.querySelector(".header__toggle"),
  menu = document.querySelector(".menu"),
  header = document.querySelector(".header"),
  content = document.querySelector(".content");

export const validationConfig = {
  formSelector: ".subscribe__form",
  inputSelector: ".subscribe__input",
  submitButtonSelector: ".subscribe__submit",
  inactiveButtonClass: ".subscribe__submit_disabled",
  inputErrorClass: ".subscribe__input_error",
  errorClass: ".subscribe__input-error_active",
};
