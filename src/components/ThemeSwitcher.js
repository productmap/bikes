export default class ThemeSwitcher {
  constructor(selector, { ...props } = {}) {
    this._toglgeList = document.querySelectorAll(selector);
    this._systemTheme = props.systemTheme ?? "";
    this._init();
  }

  _setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  }

  _init() {
    if (localStorage.getItem("theme") === "theme-light") {
      this._setTheme("theme-light");
      this._toglgeList.forEach((toggle) => {
        toggle.checked = false;
      });
    } else {
      this._setTheme("theme-dark");
      this._toglgeList.forEach((toggle) => {
        toggle.checked = true;
      });
    }
  }

  _changeToggleState(state) {
    this._toglgeList.forEach((toggle) => {
      toggle.checked = state;
    });
  }

  toggleTheme(toggles) {
    if (localStorage.getItem("theme") === "theme-dark") {
      this._setTheme("theme-light");
      this._changeToggleState(false);
    } else {
      this._setTheme("theme-dark");
      this._changeToggleState(true);
    }
  }
}
