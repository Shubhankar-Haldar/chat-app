const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserService {
  register = async ({ username, email, password }) => {
    try {
      const isUsername = await User.findOne({ username });
      if (isUsername) {
        throw { message: "Username already used", status: 400 };
      }

      const isEmail = await User.findOne({ email });
      if (isEmail) {
        throw { message: "Email already register", status: 400 };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      user.password = undefined;

      return {
        message: "User register successfully",
        status: 201,
        error: false,
        data: user,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
  login = async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw { message: "Username or password is incorrect", status: 400 };
      }

      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) {
        throw { message: "Username or password is incorrect", status: 400 };
      }

      user.password = undefined;

      return {
        message: "Login successfully",
        status: 200,
        error: false,
        data: user,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
  getAllUser = async ({ id }) => {
    try {
      const users = await User.find({ _id: { $ne: id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);

      if (!users.length) {
        throw { message: "No user", status: 400 };
      }

      return {
        message: "all users found",
        status: 200,
        error: false,
        data: users,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status ? error.status : 400,
        error: true,
      };
    }
  };
  setAvatar = async ({ userId, avatarImage }) => {
    try {
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );

      return {
        message: "Avatar set successfully",
        status: 200,
        error: false,
        data: { isSet: userData.isAvatarImageSet, image: userData.avatarImage },
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

module.exports = new UserService();
