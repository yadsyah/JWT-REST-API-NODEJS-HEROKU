'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customername: DataTypes.STRING,
    nohp: DataTypes.BIGINT,
    email: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    noktp: DataTypes.INTEGER,
    createdBy: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsTo(models.Alamat, {
      foreignKey: 'alamatId',
      targetKey: 'id',
      as: 'alamats'
    })
  };
  return Customer;
};