'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tbl_Param = sequelize.define('Tbl_Param', {
    KEY_: DataTypes.STRING,
    VALUE_: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Tbl_Param.associate = function(models) {
    // associations can be defined here
  };
  return Tbl_Param;
};