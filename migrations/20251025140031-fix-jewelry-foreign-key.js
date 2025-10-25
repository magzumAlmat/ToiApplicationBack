'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE "Files" DROP CONSTRAINT "Files_jewelry_id_fkey";');
    await queryInterface.sequelize.query('ALTER TABLE "Files" ADD CONSTRAINT "Files_jewelry_id_fkey" FOREIGN KEY ("jewelry_id") REFERENCES "Jewelry" ("id") ON DELETE SET NULL ON UPDATE CASCADE;');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('ALTER TABLE "Files" DROP CONSTRAINT "Files_jewelry_id_fkey";');
    await queryInterface.sequelize.query('ALTER TABLE "Files" ADD CONSTRAINT "Files_jewelry_id_fkey" FOREIGN KEY ("jewelry_id") REFERENCES "TraditionalGifts" ("id") ON DELETE SET NULL ON UPDATE CASCADE;');
  }
};