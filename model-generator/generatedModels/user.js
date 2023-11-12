const { Sequelize, DataTypes, Model } = require('sequelize');

        class user extends Model {}

        user.init({
  "id": {
    "type": "String",
    "allowNull": false,
    "primaryKey": true,
    "fieldName": "id",
    "_modelAttribute": true,
    "field": "id"
  },
  "email": {
    "type": "String",
    "allowNull": true,
    "primaryKey": false,
    "fieldName": "email",
    "_modelAttribute": true,
    "field": "email"
  },
  "name": {
    "type": "String",
    "allowNull": false,
    "primaryKey": false,
    "fieldName": "name",
    "_modelAttribute": true,
    "field": "name"
  },
  "surname": {
    "type": "String",
    "allowNull": false,
    "primaryKey": false,
    "fieldName": "surname",
    "_modelAttribute": true,
    "field": "surname"
  }
}, {
          sequelize,
          modelName: 'user',
        });

        

        module.exports = user;