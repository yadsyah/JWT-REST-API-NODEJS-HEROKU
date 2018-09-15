'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('item_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaproduct: {
        type: Sequelize.STRING
      },
      tipe_item: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete: 'CASCADE',
        references: {
          model: 'TipeItems',
          key: 'id',
          as: 'tipe_item'
        }
      },
      harga: {
        type: Sequelize.DOUBLE
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('item_products');
  }
};