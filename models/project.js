"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            project.hasMany(models.task, {
                foreignKey: "projectId",
                as: "tasks",
            });
        }
    }
    project.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: 
            {
              type: DataTypes.ENUM('on-progress', 'completed', 'cancelled'),
              defaultValue: 'on-progress',
            },
            description: 
            {
              type: DataTypes.TEXT,
              allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "project",
        }
    );
    return project;
};
