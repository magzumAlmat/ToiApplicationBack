// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('souvenirs', {
//       id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//       },
//       salonName: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       address: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       phone: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       district: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       itemName: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       type: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       cost: {
//         type: Sequelize.FLOAT,
//         allowNull: false
//       }
//       ,
//       supplier_id: {
//         allowNull: true,
//         type: Sequelize.INTEGER,
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.fn('NOW')
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.fn('NOW')
//       }
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('souvenirs');
//   }
// };




'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('souvenirs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      salonName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      district: {
        type: Sequelize.STRING,
        allowNull: false
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cost: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('souvenirs');
  }
};