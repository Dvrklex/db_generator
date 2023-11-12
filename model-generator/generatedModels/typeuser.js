const { Sequelize, DataTypes } = require('sequelize');

        const typeuser = (sequelize) => {
          return sequelize.define('typeuser', {
  "id": {
    "type": "String",
    "allowNull": false,
    "primaryKey": true,
    "fieldName": "id",
    "_modelAttribute": true,
    "field": "id"
  }
});
        };

        module.exports = typeuser;