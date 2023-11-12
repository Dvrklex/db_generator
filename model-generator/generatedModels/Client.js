const { Sequelize, DataTypes, Model } = require('sequelize');

        class Client extends Model {}

        Client.init({
  "id": {
    "type": "Integer",
    "allowNull": false,
    "primaryKey": true,
    "fieldName": "id",
    "_modelAttribute": true,
    "field": "id"
  },
  "name": {
    "type": "String",
    "allowNull": false,
    "primaryKey": false,
    "fieldName": "name",
    "_modelAttribute": true,
    "field": "name"
  }
}, {
          sequelize,
          modelName: 'Client',
        });

        

        module.exports = Client;