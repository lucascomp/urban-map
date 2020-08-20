const table = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admin: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      facebookId: {
        unique: true,
        type: Sequelize.STRING,
      },
      googleId: {
        unique: true,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      passwordHash: {
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }, {
      paranoid: true,
    });
  },

  down: async (queryInterface) => queryInterface.dropTable(table),
};
