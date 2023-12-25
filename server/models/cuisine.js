"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.User, { foreignKey: "authorId" });
      Cuisine.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Cuisine.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "A cuisine with that name already existed!",
        },
        validate: {
          notNull: {
            msg: "Name is empty!",
          },
          notEmpty: {
            msg: "Name is empty!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is empty",
          },
          notEmpty: {
            msg: "Description is empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is empty!",
          },
          notEmpty: {
            msg: "Price is empty!",
          },
          min: {
            args: 5000,
            msg: "Minimum price is Rp.5.000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image is empty!",
          },
          notEmpty: {
            msg: "Image is empty!",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
