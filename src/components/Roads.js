export default class Roads {
  constructor(selector, { ...props } = {}) {
    this._slider = document.querySelector(props.sliderSlider);
    this._slides = props.data ?? {};
    this._controlsButtons = document.querySelectorAll(props.controlsButtons);
    this._isDragStart = false;
    this._slidesCount = this._slides.length - 1;
    this._activeIndex = 0;
    this.slideWidth = 690;
    this._slideGap = 40;
    this._sliderTitle = document.querySelector(".roads__slide-title");
    this._sliderAbout = document.querySelector(".roads__paragraph");
    this._slideBadge = document.querySelector(".roads__image-badge");
    this._renderSlider();
    this._eventListeners();
  }

  _centerSlide() {
    this._positioDiff = Math.abs(this._positioDiff);
    this.slideGap = this.slideWidth - this._positioDiff;
    if (this._slider.scrollLeft > this._prevScrollLeft) {
      if (this._positioDiff <= 50) {
        this._slider.scrollLeft += -this._positioDiff;
      } else {
        if (this._activeIndex === this._slidesCount) {
          this._slider.scrollLeft -= this._positioDiff;
        } else {
          this._slider.scrollLeft += this.slideGap;
          this._nextSlide();
        }
      }
    } else if (this._positioDiff <= 50) {
      this._slider.scrollLeft -= -this._positioDiff;
    } else {
      if (this._activeIndex !== 0) {
        this._slider.scrollLeft -= this.slideGap;
        this._prevSlide();
      }
    }
  }

  _currentSlideWidth() {
    this.slideWidth =
      this._slider.querySelector(".roads__slide").clientWidth + this._slideGap;
  }

  _dragStart(event) {
    this._isDragStart = true;
    this._prevPageX = event.pageX || event.touches[0].pageX;
    // this._prevPageY = event.pageY || event.touches[0].pageY;
    this._prevScrollLeft = this._slider.scrollLeft;
    this._currentSlideWidth();
  }

  _dragStop() {
    this._isDragStart = false;
    this._slider.classList.remove("roads__slider_dragging");
    this._centerSlide();
    this._positioDiff = 0;
    // this._scrollDiff = 0;
  }

  _dragging(event) {
    if (!this._isDragStart) return;
    // event.preventDefault();
    this._slider.classList.add("roads__slider_dragging");
    this._positioDiff =
      (event.pageX || event.touches[0].pageX) - this._prevPageX;
    this._slider.scrollLeft = this._prevScrollLeft - this._positioDiff;

    // this._scrollDiff =
    //   (event.pageY || event.touches[0].pageY) - this._prevPageY;
    // window.scrollTo(0, this._prevPageY - this._scrollDiff);
  }

  _nextSlide() {
    const nextIndex = this._activeIndex + 1;
    this._sliderAbout.innerHTML =
      this._slides[nextIndex].description;
    this._sliderTitle.innerHTML = this._slides[nextIndex].road;
    this._slideBadge.src = require(`./../images/${this._slides[nextIndex].badge}`);
    this._activeIndex += 1;
  }

  _prevSlide() {
    const prevIndex = this._activeIndex - 1;
    this._sliderAbout.innerHTML =
      this._slides[prevIndex].description;
    this._sliderTitle.innerHTML = this._slides[prevIndex].road;
    this._slideBadge.src = require(`./../images/${this._slides[prevIndex].badge}`);
    this._activeIndex -= 1;
  }

  _eventListeners() {
    this._slider.addEventListener("mousedown", (event) =>
      this._dragStart(event)
    );
    this._slider.addEventListener("touchstart", (event) =>
      this._dragStart(event)
    );
    this._slider.addEventListener("mousemove", (event) =>
      this._dragging(event)
    );
    this._slider.addEventListener("touchmove", (event) =>
      this._dragging(event)
    );
    this._slider.addEventListener("mouseup", (event) => this._dragStop(event));
    this._slider.addEventListener("touchend", (event) => this._dragStop(event));

    this._controlsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this._currentSlideWidth();
        if (button.id === "right" && this._activeIndex < this._slidesCount) {

          this._slider.scrollLeft += this.slideWidth;
          this._nextSlide();
        }
        if (button.id === "left" && 0 < this._activeIndex) {
          if (this._activeIndex <= this._slidesCount) {
            this._slider.scrollLeft += -this.slideWidth;
            this._prevSlide();
          }
        }
      });
    });
  }

  _renderSlider() {
    this._slides.forEach((slide, idx) => {
      const newSlide = document.createElement("div");
      newSlide.classList.add("roads__slide");
      if(idx === 0) newSlide.classList.toggle("active");

      const image = document.createElement("img");
      image.classList.add("roads__image");
      image.src = require(`./../images/${slide.image}`);
      image.alt = slide.road;
      image.draggable = false;

      // const badge = document.createElement("img");
      // badge.classList.add("roads__image-badge");
      // badge.src = require(`./../images/${slide.badge}`);
      // badge.alt = slide.road;

      newSlide.append(image);

      this._slider.append(newSlide);
    });
  }
}
