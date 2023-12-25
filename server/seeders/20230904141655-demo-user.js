"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/users.json");
    const salt = bcrypt.genSaltSync(8);

    const data = users.map((user) => {
      delete user.id;
      user.createdAt = user.updatedAt = new Date();
      user.password = bcrypt.hashSync(user.password, salt);
      return user;
    });

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
