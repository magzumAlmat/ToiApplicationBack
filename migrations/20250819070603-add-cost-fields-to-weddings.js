'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Weddings', 'total_cost', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
    await queryInterface.addColumn('Weddings', 'paid_amount', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
    await queryInterface.addColumn('Weddings', 'remaining_balance', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Weddings', 'total_cost');
    await queryInterface.removeColumn('Weddings', 'paid_amount');
    await queryInterface.removeColumn('Weddings', 'remaining_balance');
  }
};
