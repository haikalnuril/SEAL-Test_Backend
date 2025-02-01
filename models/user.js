"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.task, {
                foreignKey: "userId",
                as: "tasks",
            });
        }
    }
    user.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Name is required",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: "unique_email_constraint",
                    msg: "Email already used",
                },
                validate: {
                    isEmail: {
                        msg: "Must be a valid email address",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 128],
                        msg: "Password should be between 6 and 128 characters",
                    },
                },
            },
            photo: {
                type: DataTypes.TEXT,
            },
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "user",
            paranoid: true,
            hooks: {
                beforeSave: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                },
            },
        }
    );
    return user;
};
