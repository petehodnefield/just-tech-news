const {Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

// Create user model

class User extends Model {
    // Set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// Define tabl columns and configuration
User.init({
    // Table column definitions go here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     len: [4]
            // }
        }
    },
    {
        hooks: {
            // Set up beforeCreate lifecycle 'hook' functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10)
                return newUserData
            },

            // Set up beforeUpdate lifecycle 'hook' functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
                return updatedUserData
            }
        },
        // Table configurations go here

        // pass in our important sequalize connection (the direct connection to our database)
        sequelize,
        // Don't auto create createdAt/updatedAt
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscore instead of camel-casing
        underscored: true,
        // Make it so our model name stays lowercase in the database
        modelName: 'user'
    },
)

module.exports = User;