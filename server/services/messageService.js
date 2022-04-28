const messageModel = require("../models/messageModel");

class MessageService {
  getMessages = async ({ from, to }) => {
    try {
      const msgs = await messageModel
        .find({
          users: {
            $all: [from, to],
          },
        })
        .sort({ updatedAt: 1 });

      const projectedMessages = msgs.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });

      return {
        message: "messages found",
        status: 200,
        error: false,
        data: projectedMessages,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
  addMessage = async ({ from, to, message }) => {
    try {
      const data = await messageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });

      if (!data) {
        throw { message: "Failed to add message to the database", status: 400 };
      }

      return {
        msg: "Message added successfully",
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
}

module.exports = new MessageService();
