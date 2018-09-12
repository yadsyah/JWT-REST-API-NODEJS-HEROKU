'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerName = sequelize.define('CustomerName', {
    customername: DataTypes.STRING,
    alamatId: DataTypes.INTEGER,
    nohp: DataTypes.STRING,
    email: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE
  }, {});
  CustomerName.associate = function(models) {
    // associations can be defined here
  };
  return CustomerName;
};