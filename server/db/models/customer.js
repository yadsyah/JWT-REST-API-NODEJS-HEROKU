'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customername: DataTypes.STRING,
    nohp: DataTypes.INTEGER,
    email: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    noktp: DataTypes.INTEGER
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