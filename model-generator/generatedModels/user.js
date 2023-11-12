const { Sequelize, DataTypes } = require('sequelize');

        const user = (sequelize) => {
          return sequelize.define('user', {
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
});
        };

        module.exports = user;