// Общий скрипт для всех страниц: тема, мобильное меню, модальное окно.

// Короткая запись для document.getElementById, используется на всех страницах.
function byId(id) {
  return document.getElementById(id);
}

const THEME_KEY = "portfolio-theme";

// Ставим тему: атрибут data-theme на <html> переключает CSS-переменные.
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

// Читаем сохранённую тему из localStorage и вешаем обработчик на кнопку.
function initTheme() {
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "light";
  } catch (error) {
    savedTheme = "light";
  }
  applyTheme(savedTheme);

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (error) {
      // Если хранилище недоступно, тема просто не сохранится.
    }
  });
}

// Бургер-меню: класс "open" на шапке раскрывает меню (анимация в CSS).
function initMobileNav() {
  const header = document.querySelector(".topbar");
  const burger = document.querySelector(".burger");
  if (!header || !burger) return;

  function setMenuOpen(isOpen) {
    header.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
  }

  burger.addEventListener("click", () => {
    setMenuOpen(!header.classList.contains("open"));
  });

  // После выбора пункта меню закрываем его.
  header.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

let lastFocusedElement = null;

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  if (lastFocusedElement) lastFocusedElement.focus();
}

// Модальное окно: открывается кнопкой с data-modal-open="id окна".
// Закрывается крестиком, кликом по тёмному фону и клавишей Escape.
function initModals() {
  document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      const clickedBackdrop = event.target === modal;
      const clickedCloseButton = event.target.closest("[data-modal-close]");
      if (clickedBackdrop || clickedCloseButton) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".modal.open").forEach(closeModal);
  });
}

initTheme();
initMobileNav();
initModals();
