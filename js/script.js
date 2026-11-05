// Общий скрипт: тёмная тема, мобильное меню, модальное окно и форма.

// 1. Тёмная тема
const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");

// Берём тему, которую браузер запомнил раньше (localStorage).
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

// По клику меняем тему: атрибут data-theme переключает цвета в CSS.
themeButton.addEventListener("click", function () {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// 2. Мобильное меню: класс "open" раскрывает меню (анимация в CSS).
const header = document.querySelector(".topbar");
const burger = document.querySelector(".burger");

burger.addEventListener("click", function () {
  header.classList.toggle("open");
});

// После выбора пункта меню закрываем его.
document.querySelectorAll(".nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    header.classList.remove("open");
  });
});

// 3. Модальное окно (есть только на главной странице).
const modal = document.querySelector(".modal");
if (modal) {
  const openButton = document.querySelector("[data-modal-open]");

  openButton.addEventListener("click", function () {
    modal.classList.add("open");
  });

  // Закрываем по крестику или по клику на тёмный фон.
  modal.addEventListener("click", function (event) {
    if (event.target === modal || event.target.classList.contains("modal-close")) {
      modal.classList.remove("open");
    }
  });

  // Закрываем клавишей Escape.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      modal.classList.remove("open");
    }
  });
}

// 4. Форма: браузер сам проверяет required и type="email", мы показываем сообщение.
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.reset();
    document.getElementById("form-success").hidden = false;
  });
}
