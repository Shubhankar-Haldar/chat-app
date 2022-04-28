const messageController = require("../services/messageService");

class MessageControll {
  getMessages = async (req, res) => {
    try {
      const { from, to } = req.body;
      const response = await messageController.getMessages({ from, to });

      if (response.error) {
        throw response;
      }

      res.status(response.status).json({
        message: response.message,
        error: response.error,
        data: response.data,
      });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .json({ message: error.message, error: error.error });
    }
  };

  addMessage = async (req, res) => {
    try {
      const { from, to, message } = req.body;

      const response = await messageController.addMessage({
        from,
        to,
        message,
      });

      if (response.error) {
        throw response;
      }

      res
        .status(response.status)
        .json({ message: response.msg, error: response.error });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .json({ message: error.message, error: error.error });
    }
  };
}

module.exports = new MessageControll();
