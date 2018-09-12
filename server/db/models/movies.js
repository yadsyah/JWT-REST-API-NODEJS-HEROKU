'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define('Movies', {
    name_movies: DataTypes.STRING,
    release_date: DataTypes.DATE,
    createdBy: DataTypes.STRING
  }, {});
  Movies.associate = function(models) {
    // associations can be defined here
  };
  return Movies;
};