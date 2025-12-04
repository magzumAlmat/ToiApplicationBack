'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // The financial columns already exist, so this migration is effectively skipped.
    // await queryInterface.addColumn('event_categories', 'budget', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   defaultValue: 0.00,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn('event_categories', 'total_cost', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   defaultValue: 0.00,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn('event_categories', 'paid_amount', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   defaultValue: 0.00,
    //   allowNull: false,
    // });
    // await queryInterface.addColumn('event_categories', 'remaining_balance', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   defaultValue: 0.00,
    //   allowNull: false,
    // });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('event_categories', 'budget');
    // await queryInterface.removeColumn('event_categories', 'total_cost');
    // await queryInterface.removeColumn('event_categories', 'paid_amount');
    // await queryInterface.removeColumn('event_categories', 'remaining_balance');
  }
};
