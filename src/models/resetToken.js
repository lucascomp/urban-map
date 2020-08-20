module.exports = (sequelize, DataTypes) => {
  const ResetToken = sequelize.define('ResetToken', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    token: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    expired: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  ResetToken.associate = ({ User }) => {
    ResetToken.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  };

  return ResetToken;
};
