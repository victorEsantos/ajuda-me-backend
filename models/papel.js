'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Papel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Papel.belongsToMany(models.Usuario, {
        through: "user_roles",
        foreignKey: "papelId",
        otherKey: "usuarioId"
      });
    }
  }
  Papel.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    tableName: 'Papeis',
    sequelize,
    modelName: 'Papel',
  });
  return Papel;
};