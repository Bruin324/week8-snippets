'use strict';
module.exports = function(sequelize, DataTypes) {
  var snippets = sequelize.define('snippets', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    notes: DataTypes.STRING,
    language: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    dateAdded: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        snippets.belongsTo(models.users);
      }
    }
  });
  return snippets;
};