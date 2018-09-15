'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId:{
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        allowNull:false,
        references:{
          model:'item_products',
          key:'id',
          as:'itemId'
        }
      },
      customerId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull:false,
        references:{
          model:'Customers',
          key:'id',
          as:'customerId'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      tanggal_order: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status_order: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model:'status_orders',
          key:'id',
          as:'status_order'
        }
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalHarga:{
        allowNull: false,
        type: Sequelize.DOUBLE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListOrders');
  }
};