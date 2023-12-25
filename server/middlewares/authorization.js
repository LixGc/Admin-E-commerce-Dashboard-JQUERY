const { Cuisine } = require("../models");
async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const findCuisine = await Cuisine.findByPk(id);
    if (!findCuisine) {
      throw { name: "not_found", id: id };
    }
    const { role } = req.user;
    console.log(role);
    if (role !== "admin") {
      if (findCuisine.authorId !== req.user.id) {
        throw { name: "forbidden" };
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
