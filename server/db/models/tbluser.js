'use strict';
module.exports = (sequelize, DataTypes) => {
  const TblUser = sequelize.define('TblUser', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  TblUser.associate = function(models) {
      // TblUser.belongsTo(models.TblGroup, {foreignKey: 'groupId', as: 'group'})
  };
  return TblUser;
};