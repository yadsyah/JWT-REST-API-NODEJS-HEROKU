'use strict';
module.exports = (sequelize, DataTypes) => {
  const TblGroup = sequelize.define('TblGroup', {
    groupId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: DataTypes.STRING
  }, {});
  TblGroup.associate = function(models) {
      // TblGroup.hasMany(models.TblUser, {as: 'users'} )
  };
  return TblGroup;
};