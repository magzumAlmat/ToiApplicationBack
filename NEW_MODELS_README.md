# Новые модели и API endpoints

## Добавленные модели

### 1. TechnicalEquipmentRental (Аренда технического оснащения)
**Поля:**
- `id` - Уникальный идентификатор (автоинкремент)
- `companyName` - Наименование компании (обязательное)
- `phone` - Телефон (обязательное)
- `link` - Ссылка (необязательное)
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления

**API endpoints:**
- `POST /api/technical-equipment-rental` - Создать новую запись
- `GET /api/technical-equipment-rentals` - Получить все записи
- `GET /api/technical-equipment-rental/:id` - Получить запись по ID
- `PUT /api/technical-equipment-rental/:id` - Обновить запись
- `DELETE /api/technical-equipment-rental/:id` - Удалить запись

### 2. Typography (Типография)
**Поля:**
- `id` - Уникальный идентификатор (автоинкремент)
- `companyName` - Наименование компании (обязательное)
- `phone` - Телефон (обязательное)
- `link` - Ссылка (необязательное)
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления

**API endpoints:**
- `POST /api/typography` - Создать новую типографию
- `GET /api/typographies` - Получить все типографии
- `GET /api/typography/:id` - Получить типографию по ID
- `PUT /api/typography/:id` - Обновить типографию
- `DELETE /api/typography/:id` - Удалить типографию

### 3. Hotel (Гостиница)
**Поля:**
- `id` - Уникальный идентификатор (автоинкремент)
- `name` - Наименование (обязательное)
- `address` - Адрес (обязательное)
- `averageCheck` - Средний чек (вещественное число, обязательное)
- `phone` - Телефон (обязательное)
- `link` - Ссылка (необязательное)
- `createdAt` - Дата создания
- `updatedAt` - Дата обновления

**API endpoints:**
- `POST /api/hotel` - Создать новую гостиницу
- `GET /api/hotels` - Получить все гостиницы
- `GET /api/hotel/:id` - Получить гостиницу по ID
- `PUT /api/hotel/:id` - Обновить гостиницу
- `DELETE /api/hotel/:id` - Удалить гостиницу

## Созданные файлы

### Модели:
- `models/TechnicalEquipmentRental.js`
- `models/Typography.js`
- `models/Hotel.js`

### Миграции:
- `migrations/20250610012800-create-technical-equipment-rentals.js`
- `migrations/20250610012801-create-typographies.js`
- `migrations/20250610012802-create-hotels.js`

### Контроллеры:
- `controllers/TechnicalEquipmentRentalController.js`
- `controllers/TypographyController.js`
- `controllers/HotelController.js`

### Маршруты:
- `routes/technicalEquipmentRentalRouter.js`
- `routes/typographyRouter.js`
- `routes/hotelRouter.js`

## Обновленные файлы:
- `server.js` - добавлены новые маршруты
- `models/index.js` - добавлены новые модели в экспорт

## Примеры использования API

### Создание аренды технического оснащения:
```bash
POST /api/technical-equipment-rental
Content-Type: application/json

{
  "companyName": "ТехАренда Плюс",
  "phone": "+7 (777) 123-45-67",
  "link": "https://techarenda.kz"
}
```

### Создание типографии:
```bash
POST /api/typography
Content-Type: application/json

{
  "companyName": "Принт Мастер",
  "phone": "+7 (777) 987-65-43",
  "link": "https://printmaster.kz"
}
```

### Создание гостиницы:
```bash
POST /api/hotel
Content-Type: application/json

{
  "name": "Отель Казахстан",
  "address": "г. Алматы, ул. Достык 52",
  "averageCheck": 25000.50,
  "phone": "+7 (727) 291-95-95",
  "link": "https://hotel-kazakhstan.kz"
}
```

## Запуск миграций

Для применения миграций выполните:
```bash
npx sequelize-cli db:migrate
```

Все новые модели готовы к использованию и интегрированы в существующую архитектуру проекта.

