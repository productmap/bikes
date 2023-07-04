import {content, header, menu, menuLinks, menuToggle} from "./constants";

// Тогл открытия/закрытия меню
menuToggle.addEventListener("click", () => {
  header.classList.toggle("header_opened");
  menu.classList.toggle("menu_opened");
  content.classList.toggle("content_fixed");
  menuToggle.classList.toggle("close");
});

// Закрытие меню при клике на ссылку
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("header_opened");
    menu.classList.remove("menu_opened");
    content.classList.remove("content_fixed");
    menuToggle.classList.remove("close");
  });
});
