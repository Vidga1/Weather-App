# **Приложение прогноза погоды с картой**

## **Описание**

![PR Sanity Check](https://github.com/Vidga1/Weather-App/workflows/PR%20Sanity%20Check/badge.svg)

### *Приложение предоставляет пользователям возможность просматривать текущую погоду в их местоположении, а также искать погоду в разных городах мира. Кроме того, приложение отображает карту для выбранного города.*

## **Основные функции**

### 1. Автоматический прогноз погоды: При открытии страницы пользователь видит погоду в своей местности.
### 2. Поиск погоды по городу: Пользователи могут вводить названия городов, чтобы узнать текущую погоду в них.
### 3. История запросов: Приложение сохраняет последние 10 городов, где пользователь проверял погоду, и позволяет быстро переключаться между ними.
### 4. Карта местности: Для каждого выбранного города отображается карта с использованием Yandex Maps Static API.

## **Технологии и API**

### Погода: [OpenWeatherMap Current Weather Data](https://openweathermap.org/current)
### Карты: [Яндекс.Карты API](https://yandex.ru/dev/maps/jsapi/)

## **Как начать**
### 1. Клонируйте репозиторий: git clone [ссылка на ваш репозиторий].
### 2. Установите зависимости (если есть): например, npm install.
### 3. Запустите проект: например, npm start.

## **Структура проекта**


- /src
  - /js
    - cityList.js - Компонент для отображения списка из 10 городов 
    - geolocation.js - Компонент для определения и отображения текущего местоположения пользователя
    - main.js - Основной компонент для управления взаимодействием в приложении
    - map.js - Компонент для интеграции и отображения Яндекс.Карт
    - weather.js - Компонент для получения и отображения погоды с Openweathermap.org и связи с Яндекс.Картами
    - localStorage - Компонент для сохранения списка из 10 городов 
  - /sass
    - main.scss - Основные стили приложения
  - index.html - Главный HTML-файл приложения
- /test
- README.md - Описание проекта
- package.json - Метаданные проекта и список зависимостей
