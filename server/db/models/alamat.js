'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alamat = sequelize.define('Alamat', {
    address: DataTypes.STRING,
    kodepos: DataTypes.INTEGER,
    kota: DataTypes.STRING,
    negara: DataTypes.STRING
  }, {});
  Alamat.associate = function(models) {
    // associations can be defined here
  };
  return Alamat;
};