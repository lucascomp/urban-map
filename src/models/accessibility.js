module.exports = (sequelize, DataTypes) => {
  const Accessibility = sequelize.define('Accessibility', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
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

  Accessibility.associate = ({ Marker }) => {
    Accessibility.hasMany(Marker, { foreignKey: 'accessibilityId' });
  };

  return Accessibility;
};
