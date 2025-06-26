# Система категорий мероприятий

## Добавленные модели

### 1. EventCategory (Категории мероприятий)
**Поля:**
- `id` - Уникальный идентификатор (автоинкремент)
- `name` - Название категории (обязательное, уникальное)
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления

### 2. EventService (Связь категорий с услугами)
**Поля:**
- `id` - Уникальный идентификатор (автоинкремент)
- `eventCategoryId` - ID категории мероприятия (внешний ключ)
- `serviceId` - ID услуги
- `serviceType` - Тип услуги (Restaurant, Alcohol, Flowers, etc.)
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления

## Созданные категории мероприятий

### 1. Традиционные семейные торжества
Включает следующие типы услуг:
- Ресторан (Restaurant)
- Цветы (Flowers)
- Алкоголь (Alcohol)
- Гостиницы (Hotel)
- Ведущие (Tamada)
- Шоу программа (Program)
- Прокат Авто (Transport)
- Ювелирные изделия (Jewelry)
- Торты (Cakes)

### 2. Корпоративные мероприятия
Включает следующие типы услуг:
- Прокат Авто (Transport)
- Ресторан (Restaurant)
- Традиционные подарки (TraditionalGifts)
- Алкоголь (Alcohol)
- Торты (Cakes)
- Ведущий (Tamada)
- Шоу программа (Program)
- Аренда технического оснащения (TechnicalEquipmentRental)

### 3. Конференции
Включает следующие типы услуг:
- Гостиница (Hotel)
- Аренда технического оснащения (TechnicalEquipmentRental)
- Ведущий (Tamada)
- Типография (Typography)

## API endpoints для категорий мероприятий

### Основные операции с категориями:
- `POST /api/event-category` - Создать новую категорию
- `GET /api/event-categories` - Получить все категории с их услугами
- `GET /api/event-category/:id` - Получить категорию по ID
- `GET /api/event-category/:id/services` - Получить категорию с детальной информацией об услугах
- `PUT /api/event-category/:id` - Обновить категорию
- `DELETE /api/event-category/:id` - Удалить категорию

### Управление услугами в категориях:
- `POST /api/event-category/:categoryId/service` - Добавить услугу к категории
- `DELETE /api/event-category/:categoryId/service/:serviceId` - Удалить услугу из категории

## Созданные файлы

### Модели:
- `models/EventCategory.js` - Модель категорий мероприятий
- `models/EventService.js` - Модель связей между категориями и услугами

### Миграции:
- `migrations/20250610013000-create-event-categories.js` - Создание таблицы категорий
- `migrations/20250610013001-create-event-services.js` - Создание таблицы связей

### Контроллеры:
- `controllers/EventCategoryController.js` - Контроллер для работы с категориями

### Маршруты:
- `routes/eventCategoryRouter.js` - Маршруты для API категорий

### Сидеры:
- `seeders/20250610014000-event-categories-and-services.js` - Начальные данные

## Обновленные файлы:
- `server.js` - добавлены маршруты для категорий мероприятий
- `models/index.js` - добавлены новые модели и их связи

## Примеры использования API

### Получить все категории с услугами:
```bash
GET /api/event-categories
```

### Получить категорию с детальной информацией об услугах:
```bash
GET /api/event-category/1/services
```

### Создать новую категорию:
```bash
POST /api/event-category
Content-Type: application/json

{
  "name": "Детские праздники"
}
```

### Добавить услугу к категории:
```bash
POST /api/event-category/1/service
Content-Type: application/json

{
  "serviceId": 2,
  "serviceType": "Restaurant"
}
```

## Запуск миграций и сидеров

Для применения миграций:
```bash
npx sequelize-cli db:migrate
```

Для заполнения начальными данными:
```bash
npx sequelize-cli db:seed:all
```

## Архитектура системы

Система использует полиморфную ассоциацию через таблицу `event_services`, которая позволяет связывать категории мероприятий с различными типами услуг. Каждая запись в `event_services` содержит:
- ID категории мероприятия
- ID конкретной услуги
- Тип услуги (название модели)

Это позволяет гибко управлять составом услуг для каждой категории мероприятий и легко добавлять новые типы услуг в будущем.

