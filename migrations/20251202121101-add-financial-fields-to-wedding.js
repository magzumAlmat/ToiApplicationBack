'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // The budget column already exists, so this migration is effectively skipped.
    // await queryInterface.addColumn('Weddings', 'budget', {
    //   type: Sequelize.DECIMAL(10, 2),
    //   defaultValue: 0.00,
    //   allowNull: false,
    // });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Weddings', 'budget');
  }
};
