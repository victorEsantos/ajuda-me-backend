'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Usuario.belongsToMany(models.Papel, {
        through: "user_roles",
        foreignKey: "usuarioId",
        otherKey: "pepelId"
      });

      Usuario.belongsTo(models.Endereco, {
        constraints: true,
        foreignKey: 'enderecoId',
        onDelete: 'CASCADE'
      })

    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    user: DataTypes.STRING,
    senha: DataTypes.STRING,
    enderecoId: DataTypes.INTEGER,
    papelId: DataTypes.INTEGER,
    dataNascimento: DataTypes.DATE,
    nacionalidade: DataTypes.STRING,
    cidadeNascimento: DataTypes.STRING,
    genero: DataTypes.ENUM("MASCULINO", "FEMININO", "TRANS", "OUTRO"),
    corRaca: DataTypes.ENUM("AMARELA", "BRANCA", "INDIGENA", "PARDA", "PRETA"),
    estadoOndeAtravessouFronteira: DataTypes.STRING,
    viaDeEntrada: DataTypes.ENUM("TERRESTRE", "AEREO", "MARITIMO"),
    hasFamiliaresNoBrasil: DataTypes.BOOLEAN,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    crnm: DataTypes.STRING,
    protocoloSolicitacaoRefugio: DataTypes.STRING,
    passaporte: DataTypes.STRING,
    ctps: DataTypes.STRING,
    hasContaBancariaNoBrasil: DataTypes.BOOLEAN,
    idioma: DataTypes.STRING,
    hasEnsinoFundamental: DataTypes.BOOLEAN,
    hasEnsinoMedio: DataTypes.BOOLEAN,
    hasEnsinoSuperior: DataTypes.BOOLEAN,
    hasPosGraduacao: DataTypes.BOOLEAN,
    hasComprovanteEscolaridade: DataTypes.BOOLEAN,
    retomarEstudosBrasil: DataTypes.BOOLEAN,
    fazTratamentoSaude: DataTypes.BOOLEAN,
    profissao: DataTypes.STRING,
    situacaoMigratoria: DataTypes.ENUM("REGULAR", "IRREGULAR", "APATRIDA", "AUTORIZACAO_RESIDENCIA", "REFUGIADO", "SOLICITANTE_REFUGIO", "VISTO_HUMANITARIO"),
    observacao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};