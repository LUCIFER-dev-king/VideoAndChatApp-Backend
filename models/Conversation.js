module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    receiverId: {
      type: DataTypes.STRING,
    },
  });

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, {
      onDelte: "cascade",
    });
  };

  return Conversation;
};
