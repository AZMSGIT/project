# Сайт-портфолио (HTML, CSS, JavaScript)

Учебный сайт на чистых HTML, CSS и JavaScript без фреймворков.

## Как запустить
Положите свои файлы в `assets/` и откройте `index.html` двойным кликом в браузере.

Какие файлы нужны:
- `assets/images/`: `photo.jpg`, `photo-about.jpg`, `mountains.jpg`
- `assets/videos/`: `video.mp4`
- `assets/audio/`: `audio.mp3`

## Структура
```text
project/
├── index.html, about.html
├── css/style.css
├── js/script.js
└── assets/{images,videos,audio,icons}/
```

## Страницы
- **index.html**: главная (hero, учебный проект с модальным окном, обо мне, навыки, портфолио, контакты с формой из трёх полей).
- **about.html**: подробнее обо мне, фото, видео, аудио.


## JavaScript
- `script.js`: четыре блока без функций: тема, мобильное меню, модальное окно, форма

## Главные CSS-свойства
CSS-переменные и `:root[data-theme="dark"]` (тема), `position`, `transition`, `transform`, `display: flex`, `display: grid`, `@media`, `aspect-ratio`, `object-fit`.

## Проверка на телефоне
В Chrome нажмите F12, затем значок телефона и выберите устройство. Проверьте бургер-меню и форму.
