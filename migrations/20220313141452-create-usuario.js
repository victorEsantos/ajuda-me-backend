'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dataNascimento: {
        type: Sequelize.DATE
      },
      nacionalidade: {
        type: Sequelize.STRING
      },
      cidadeNascimento: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.ENUM("PREFIRO_NAO_DIZER", "MASCULINO", "FEMININO", "TRANS", "OUTRO")
      },
      corRaca: {
        type: Sequelize.ENUM("AMARELA", "BRANCA", "INDIGENA", "PARDA", "PRETA")
      },
      estadoOndeAtravessouFronteira: {
        type: Sequelize.STRING
      },
      viaDeEntrada: {
        type: Sequelize.ENUM("TERRESTRE", "AEREO", "MARITIMO"),
      },
      hasFamiliaresNoBrasil: {
        type: Sequelize.BOOLEAN
      },
      telefone: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      crnm: {
        type: Sequelize.STRING
      },
      crnmVencimento: {
        type: Sequelize.DATE
      },
      protocoloSolicitacaoRefugio: {
        type: Sequelize.STRING
      },
      passaporte: {
        type: Sequelize.STRING
      },
      ctps: {
        type: Sequelize.STRING
      },
      hasContaBancariaNoBrasil: {
        type: Sequelize.BOOLEAN
      },
      idioma: {
        type: Sequelize.STRING
      },
      hasEnsinoFundamental: {
        type: Sequelize.BOOLEAN
      },
      hasEnsinoMedio: {
        type: Sequelize.BOOLEAN
      },
      hasEnsinoSuperior: {
        type: Sequelize.BOOLEAN
      },
      hasPosGraduacao: {
        type: Sequelize.BOOLEAN
      },
      hasComprovanteEscolaridade: {
        type: Sequelize.BOOLEAN
      },
      retomarEstudosBrasil: {
        type: Sequelize.BOOLEAN
      },
      fazTratamentoSaude: {
        type: Sequelize.BOOLEAN
      },
      profissao: {
        type: Sequelize.STRING
      },
      situacaoMigratoria: {
        type: Sequelize.ENUM("REGULAR", "IRREGULAR", "APATRIDA", "AUTORIZACAO_RESIDENCIA", "REFUGIADO", "SOLICITANTE_REFUGIO", "VISTO_HUMANITARIO")
      },
      observacao: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};