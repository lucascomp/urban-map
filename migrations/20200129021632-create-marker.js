const table = 'Markers';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Users',
        },
      },
      accessibilityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'Accessibilities',
        },
      },
      lat: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      lng: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000),
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
