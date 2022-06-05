'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Usuario, {
        through: "user_roles",
        as: "usuarios",
        foreignKey: "roleId",
        otherKey: "usuarioId"
      });
    }
  }
  Role.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Roles',
    sequelize,
    modelName: 'Role',
  });
  return Role;
};