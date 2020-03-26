'use strict'

const Sequelize = require('sequelize')
const path = require('path')

// dialect
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite'),
  logging: false
})

// model
const Model = Sequelize.Model
class User extends Model {}
class Secret extends Model {}

User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'user'
})

Secret.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'secret'
})

// setup fn
async function modelUrl() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    return { User, Secret }
  } catch (err) { return { error: err } }
}

module.exports = { modelUrl }