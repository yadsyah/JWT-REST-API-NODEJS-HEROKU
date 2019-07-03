'use strict';
module.exports = (sequelize, DataTypes) => {
  const item_product = sequelize.define('item_product', {
    namaproduct: DataTypes.STRING,
    tipe_item: DataTypes.INTEGER,
    harga: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    createdBy: DataTypes.STRING
  }, {});
  item_product.associate = function(models) {
  //   // associations can be defined here
    // item_product.belongsTo(models.TipeItem,{
    //   foreignKey: 'tipe_item',
    //   targetKey: 'id',
    //   as: 'tipeItems'
    // })
    // item_product.hasMany(models.ListOrder,{
    //   foreignKey: 'id',
    //   targetKey:'itemId',
    //   as:'listOrders'
    // })
  };
  return item_product;
};