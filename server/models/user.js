'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, 8)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};