const userService = require("../services/userService");

class UserController {
  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const response = await userService.login({ username, password });
      if (response.error) {
        throw response;
      }

      res.status(response.status).json({
        message: response.message,
        error: response.error,
        user: response.data,
      });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .json({ message: error.message, error: error.error });
    }
  };
  register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const response = await userService.register({
        username,
        email,
        password,
      });
      if (response.error) {
        throw response;
      }

      res.status(response.status).json({
        message: response.message,
        error: response.error,
        user: response.data,
      });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .json({ message: error.message, error: error.error });
    }
  };
  getAllUsers = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await userService.getAllUser({ id });
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
  SetAvatar = async (req, res) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;

      const response = await userService.setAvatar({ userId, avatarImage });
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
  logout = async (req, res) => {
    try {
      const userId = req.params.id;

      const response = await userService.logout({ userId });
      if (response.error) {
        throw response;
      }

      res.status(response.status).json({
        message: response.message,
        error: response.error,
      });
    } catch (error) {
      res
        .status(error.status ? error.status : 400)
        .json({ message: error.message, error: error.error });
    }
  };
}

module.exports = new UserController();
