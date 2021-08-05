module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    senderId: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
  });

  return Message;
};
