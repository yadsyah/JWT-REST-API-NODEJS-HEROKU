'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CustomerNames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customername: {
        type: Sequelize.STRING
      },
      alamatId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model:'alamats',
          key:'id',
          as:'alamatId'
        }
      },
      nohp: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CustomerNames');
  }
};