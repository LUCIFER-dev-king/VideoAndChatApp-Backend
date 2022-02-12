module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    receiverId: {
      type: DataTypes.STRING,
    },
    coversationLinkId: {
      type: DataTypes.INTEGER,
    },
  });

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, {
      onDelte: "cascade",
    });
  };

  return Conversation;
};
