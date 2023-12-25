const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { Cuisine, User, Category } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      await User.create({ username, email, password, role: "admin", phoneNumber, address });
      res.status(201).json({ message: `User with email ${email} succesfully created!` });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const error = [];
      if (!email) {
        throw { name: "invalid_email_or_password" };
      }
      if (!password) {
        throw { name: "invalid_email_or_password" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: `not_valid` };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: `not_valid` };
      }
      const access_token = signToken({ id: user.id });
      const username = user.username;
      res.status(200).json({ access_token, username });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "RANDOMPASSWORD",
          role: "staff",
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
      });
      let status = 200;
      if (isCreated) {
        status = 201;
      }
      const name = payload.name;
      res.status(200).json({ access_token, name });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addCuisine(req, res, next) {
    const { name, description, price, imgUrl, categoryId } = req.body;
    try {
      console.log(req.body);
      await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        authorId: req.user.id,
        categoryId,
      });
      res.status(201).json({ message: `Cuisine ${name} succesfully added!` });
    } catch (err) {
      next(err);
    }
  }

  static async cuisine(req, res, next) {
    try {
      let cuisines = await Cuisine.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "username", "email", "role", "phoneNumber", "address", "createdAt", "updatedAt"],
          },
          {
            model: Category,
          },
        ],
      });
      if (!cuisines) {
        throw { name: `Data not found!` };
      }
      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  static async cuisineById(req, res, next) {
    try {
      const id = +req.params.id;
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) {
        throw res.status(404).json({ message: `Cuisine with id ${id} is not found!` });
      }
      res.status(200).json({ message: cuisine });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCuisine(req, res, next) {
    const id = +req.params.id;
    try {
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) {
        throw { name: `Cuisine with id ${id} is not found!` };
      }
      let deleteCuisine = await Cuisine.destroy({ where: { id } });
      res.status(200).json({ message: `Cuisine ${cuisine.name} successfully deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async categories(req, res, next) {
    try {
      let data = await Category.findAll();
      if (!data) {
        throw { name: `data_not_found` };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
