export default class Bikes {
  constructor(selector, { ...props } = {}) {
    this._selector = document.querySelector(selector);
    this._container = props.container;
    this._slider = document.querySelector(this._container);
    this._data = props.data;
    this._card = props.card;
    this._cardImage = props.cardImage;
    this._cardDescription = props.cardDescription;
    // this._renderer = props.renderer;
    this.render();
  }

  _createSlide(data) {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide", this._card);

    const slideImage = document.createElement("img");
    slideImage.classList.add(this._cardImage);
    slideImage.src = `images/${data.image}`;
    slideImage.alt = data.model;
    slide.appendChild(slideImage);

    const slideDescription = document.createElement("p");
    slideDescription.classList.add(this._cardDescription);
    slideDescription.textContent = data.model;
    slide.appendChild(slideDescription);

    return slide;
  }

  _select(el, data) {
    // Сброс выбора
    const options = this._selector.querySelectorAll(".selector__option")
    options.forEach((option) => {
      option.classList.remove("selector__option_active");
    });
    // Активация выбора
    el.classList.add("selector__option_active");
    this._selector.classList.toggle("selector_open");

    this._slider.textContent = "";
    data.bikes.forEach((bike) => {
      this._slider.append(this._createSlide(bike));
    });
  }

  eventListener(el, data) {
    el.addEventListener("click", () => {
      this._select(el, data);
    });
  }

  render() {
    this._data.forEach((road, idx) => {
      this.el = document.createElement("li");
      this.el.textContent = road.road;
      this.el.classList.add("selector__option");
      this.eventListener(this.el, road);
      this._selector.append(this.el);
      if (idx === 0) {
        this._select(this.el, road);
      }
    });
  }
}
