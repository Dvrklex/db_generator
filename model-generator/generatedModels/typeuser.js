const { Sequelize, DataTypes, Model } = require('sequelize');

        class typeuser extends Model {}

        typeuser.init({
  "id": {
    "type": "String",
    "allowNull": false,
    "primaryKey": true,
    "fieldName": "id",
    "_modelAttribute": true,
    "field": "id"
  }
}, {
          sequelize,
          modelName: 'typeuser',
        });

        

        module.exports = typeuser;