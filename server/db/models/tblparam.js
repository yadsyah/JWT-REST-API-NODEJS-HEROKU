'use strict';
module.exports = (sequelize, DataTypes) => {
  const TblParam = sequelize.define('TblParam', {
    key_: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    value_: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  TblParam.associate = function(models) {
    // associations can be defined here
  };
  return TblParam;
};