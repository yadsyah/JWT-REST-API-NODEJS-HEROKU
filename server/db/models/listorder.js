'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListOrder = sequelize.define('ListOrder', {
    quantity: DataTypes.INTEGER,
    tanggal_order: DataTypes.DATE,
    totalHarga: DataTypes.DOUBLE,
    createdBy: DataTypes.STRING,
  }, {});
  ListOrder.associate = function(models) {
    // associations can be defined here
    ListOrder.belongsTo(models.status_order,{
      foreignKey: 'status_order',
      targetKey:'id',
      as:'statusOrders'
    })
    ListOrder.belongsTo(models.item_product, {
      foreignKey: 'itemId',
      targetKey: 'id',
      as:'itemProducts'
    })
    ListOrder.belongsTo(models.Customer,{
      foreignKey:'customerId',
      targetKey:'id',
      as:'customers'
    })
  };
  return ListOrder;
};