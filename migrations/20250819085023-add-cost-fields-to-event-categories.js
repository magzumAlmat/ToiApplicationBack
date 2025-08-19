'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('event_categories', 'total_cost', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
    await queryInterface.addColumn('event_categories', 'paid_amount', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
    await queryInterface.addColumn('event_categories', 'remaining_balance', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('event_categories', 'total_cost');
    await queryInterface.removeColumn('event_categories', 'paid_amount');
    await queryInterface.removeColumn('event_categories', 'remaining_balance');
  }
};
