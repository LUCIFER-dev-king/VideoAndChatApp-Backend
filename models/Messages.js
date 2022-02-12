module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      senderId: {
        type: DataTypes.STRING,
      },
      receiverId: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      created: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return Message;
};
