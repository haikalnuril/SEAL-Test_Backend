"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            task.belongsTo(models.project, {
                foreignKey: "projectId",
                as: "project",
            });
            task.belongsTo(models.user, {
                foreignKey: "userId",
                as: "user",
            });
        }
    }
    task.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("on-progress", "completed", "cancelled"),
                defaultValue: "on-progress",
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            projectId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "task",
        }
    );
    return task;
};
