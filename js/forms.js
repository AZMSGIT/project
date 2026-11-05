// Скрипт страницы Формы: проверка полей и сообщение об успехе.

const form = byId("register-form");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Сегодняшняя дата в формате ГГГГ-ММ-ДД (как у поля type="date").
function getTodayString() {
  return new Date().toLocaleDateString("en-CA");
}

// Каждая функция возвращает текст ошибки или пустую строку, если всё верно.
// Ключ совпадает с id поля, поэтому ошибка выводится в элемент "<id>-error".
const validators = {
  name() {
    const value = byId("name").value.trim();
    if (!value) return "Введите имя.";
    if (value.length < 2) return "Имя должно содержать минимум 2 символа.";
    return "";
  },
  email() {
    const value = byId("email").value.trim();
    if (!value) return "Введите email.";
    if (!emailPattern.test(value)) return "Email указан неверно. Пример: name@example.com";
    return "";
  },
  password() {
    const value = byId("password").value;
    if (!value) return "Введите пароль.";
    if (value.length < 8) return "Пароль должен содержать минимум 8 символов.";
    if (!/[A-Za-zА-Яа-я]/.test(value) || !/\d/.test(value)) return "Добавьте в пароль буквы и цифры.";
    return "";
  },
  experience() {
    const value = byId("experience").value;
    if (value === "") return "";
    const years = Number(value);
    if (years < 0 || years > 50) return "Укажите число от 0 до 50.";
    return "";
  },
  "visit-date"() {
    const value = byId("visit-date").value;
    if (!value) return "Выберите дату.";
    if (value < getTodayString()) return "Дата не может быть в прошлом.";
    return "";
  },
  "contact-group"() {
    return form.querySelector('input[name="contact"]:checked') ? "" : "Выберите способ связи.";
  },
  topic() {
    return byId("topic").value ? "" : "Выберите тему обращения.";
  },
  message() {
    const value = byId("message").value.trim();
    if (!value) return "Напишите сообщение.";
    if (value.length < 10) return "Сообщение должно содержать минимум 10 символов.";
    return "";
  },
  attachment() {
    const file = byId("attachment").files[0];
    if (file && file.size > 2 * 1024 * 1024) return "Файл больше 2 МБ.";
    return "";
  },
  terms() {
    return byId("terms").checked ? "" : "Нужно согласие на обработку данных.";
  }
};

// Показывает текст ошибки и помечает поле как неверное для экранных читалок.
function showError(fieldId, message) {
  byId(fieldId + "-error").textContent = message;
  const field = byId(fieldId);
  if (field.tagName !== "DIV") {
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }
}

function focusField(fieldId) {
  const target = fieldId === "contact-group" ? form.querySelector('input[name="contact"]') : byId(fieldId);
  target.focus();
}

function validateAll() {
  let firstInvalidId = null;
  Object.keys(validators).forEach((fieldId) => {
    const message = validators[fieldId]();
    showError(fieldId, message);
    if (message && !firstInvalidId) firstInvalidId = fieldId;
  });
  return firstInvalidId;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const success = byId("form-success");
  const firstInvalidId = validateAll();

  if (firstInvalidId) {
    success.hidden = true;
    focusField(firstInvalidId);
    return;
  }

  const name = byId("name").value.trim();
  form.reset();
  byId("rating-value").textContent = byId("rating").value;
  success.textContent = `Спасибо, ${name}! Все данные заполнены верно.`;
  success.hidden = false;
  success.focus();
});

// Проверяем поле, когда пользователь уходит из него, и исправляем ошибку сразу при вводе.
form.addEventListener("focusout", (event) => {
  const fieldId = event.target.id;
  if (validators[fieldId]) showError(fieldId, validators[fieldId]());
});
form.addEventListener("input", (event) => {
  const fieldId = event.target.id;
  if (validators[fieldId] && event.target.getAttribute("aria-invalid") === "true") {
    showError(fieldId, validators[fieldId]());
  }
});
form.addEventListener("change", (event) => {
  if (event.target.name === "contact") showError("contact-group", validators["contact-group"]());
  if (event.target.id === "terms") showError("terms", validators.terms());
  if (event.target.id === "attachment") showError("attachment", validators.attachment());
});

byId("rating").addEventListener("input", (event) => {
  byId("rating-value").textContent = event.target.value;
});

// Нельзя выбрать дату раньше сегодняшней.
byId("visit-date").min = getTodayString();
