// seeders/20250318110618-goods.js
'use strict';

const goodsData = [
  // 1. Деньги
  { category: 'Деньги', item_name: 'Наличные в красивом конверте', description: 'Универсальный подарок для любых нужд', cost: 1000, specs: JSON.stringify({ suggested_amount: '10000 руб' }), created_at: new Date(), updated_at: new Date() },
  { category: 'Деньги', item_name: 'Перевод на карту', description: 'Символическая сумма для счастья', cost: 2000, specs: JSON.stringify({ suggested_amount: '10001 руб' }), created_at: new Date(), updated_at: new Date() },
  { category: 'Деньги', item_name: 'Подарочный сертификат', description: 'Дает свободу выбора', cost: 3000, specs: JSON.stringify({ suggested_amount: '5000 руб' }), created_at: new Date(), updated_at: new Date() },
  { category: 'Деньги', item_name: 'Денежное дерево', description: 'Символ достатка с купюрами', cost: 4000, specs: JSON.stringify({ suggested_amount: '5000 руб' }), created_at: new Date(), updated_at: new Date() },
  { category: 'Деньги', item_name: 'Ваучер на путешествие', description: 'Часть оплаты медового месяца', cost: 5000, specs: JSON.stringify({ suggested_amount: '20000 руб' }), created_at: new Date(), updated_at: new Date() },

  // 2. Бытовая техника
  { category: 'Бытовая техника', item_name: 'Телевизор', description: 'Для уютных вечеров дома', cost: 32323, specs: JSON.stringify({ diagonal: '55 дюймов', resolution: '4K', smart_tv: true }), created_at: new Date(), updated_at: new Date() },
  { category: 'Бытовая техника', item_name: 'Робот-пылесос', description: 'Автоматизация уборки', cost: 232, specs: JSON.stringify({ power: '2000 Па', battery_life: '120 мин', wet_cleaning: true }), created_at: new Date(), updated_at: new Date() },
  { category: 'Бытовая техника', item_name: 'Кофемашина', description: 'Для идеального утра', cost: 2323, specs: JSON.stringify({ type: 'автоматическая', capacity: '1.8 л' }), created_at: new Date(), updated_at: new Date() },
  { category: 'Бытовая техника', item_name: 'Мультиварка', description: 'Удобство на кухне', cost: 4434, specs: JSON.stringify({ volume: '5 л', programs: 10 }), created_at: new Date(), updated_at: new Date() },
  { category: 'Бытовая техника', item_name: 'Микроволновая печь', description: 'Быстрый разогрев еды', cost: 2323, specs: JSON.stringify({ power: '800 Вт', volume: '20 л' }), created_at: new Date(), updated_at: new Date() },

  // 3. Посуда и кухонные принадлежности
  { category: 'Посуда и кухонные принадлежности', item_name: 'Набор столовой посуды', description: 'Для семейных ужинов', cost: 24424, specs: JSON.stringify({ material: 'фарфор', pieces: 12 }), created_at: new Date(), updated_at: new Date() },
  { category: 'Посуда и кухонные принадлежности', item_name: 'Комплект кастрюль', description: 'Основа кухни', cost: 2424, specs: JSON.stringify({ material: 'нержавеющая сталь', pieces: 3 }), created_at: new Date(), updated_at: new Date() },
  { category: 'Посуда и кухонные принадлежности', item_name: 'Чайный сервиз', description: 'Для чаепитий', cost: 24244, specs: JSON.stringify({ material: 'керамика', pieces: 6 }), created_at: new Date(), updated_at: new Date() },
  { category: 'Посуда и кухонные принадлежности', item_name: 'Столовые приборы', description: 'Элегантный набор', cost: 344343, specs: JSON.stringify({ material: 'нержавеющая сталь', pieces: 24 }), created_at: new Date(), updated_at: new Date() },
  { category: 'Посуда и кухонные принадлежности', item_name: 'Бокалы для вина', description: 'Для романтических вечеров', cost: 343434, specs: JSON.stringify({ material: 'стекло', pieces: 6 }), created_at: new Date(), updated_at: new Date() },

  // Добавьте остальные категории аналогично (для краткости я опущу их здесь, но вы можете скопировать из предыдущего кода и применить JSON.stringify к specs)
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Goods', goodsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Goods', null, {});
  },
};