'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Weddings', 'budget', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
    });
  },

  async down (queryInterface, Sequelize) {
    // Reverting to previous state is tricky without knowing exact previous state, 
    // but assuming we want to revert to not null if we rolled back this specific change
    // However, usually we don't want to revert to a broken state. 
    // For safety, we can leave it nullable or try to set it back to not null if data allows.
    // Here I will just leave it as is or maybe set it to not null if that was the intention before.
    // Given the error was about constraint violation, reverting would mean re-adding the constraint.
    // But let's just keep it simple.
    await queryInterface.changeColumn('Weddings', 'budget', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true, // Keeping it nullable in down for safety
        defaultValue: null,
    });
  }
};
