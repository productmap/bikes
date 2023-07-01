export default class Subscribe {
  constructor(config) {
    this._form = document.querySelector(config.formSelector);
    this._input = this._form.querySelector(config.inputSelector);
    this._submit = this._form.querySelector(config.submitButtonSelector);
    this._errorClass = config.errorClass;
    this._errorMessage = config.inputErrorClass;
    this._eventListeners();
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._errorMessage);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._errorMessage);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.validationMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _eventListeners() {
    this._input.addEventListener("input", () => {
      this._input.placeholder = "";
      this._submit.style.display = "block";
      this._checkInputValidity(this._input);
    });

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(this._input.value);
      this._input.value = "Круто!";
      this._submit.style.display = "none";
    });
  }
}
