'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListOrder = sequelize.define('ListOrder', {
    quantity: DataTypes.INTEGER,
    tanggal_order: DataTypes.DATE
  }, {});
  ListOrder.associate = function(models) {
    // associations can be defined here
  };
  return ListOrder;
};