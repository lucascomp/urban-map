module.exports = (sequelize, DataTypes) => {
  const Marker = sequelize.define('Marker', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    accessibilityId: {
      type: DataTypes.INTEGER,
    },
    lat: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    lng: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  Marker.associate = ({ User, Accessibility }) => {
    Marker.belongsTo(User, { as: 'user', foreignKey: 'userId' });
    Marker.belongsTo(Accessibility, { as: 'accessibility', foreignKey: 'accessibilityId' });
  };

  return Marker;
};
