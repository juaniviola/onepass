'use strict'

const inquirer = require('inquirer')
const clear = require('clear')
const { credentials, menu } = require('../questions')
const db = require('../db')
const mainMenu = require('./mainMenu')

module.exports = async function main () {
  try {
    const acc = await inquirer.prompt(credentials.hasAccount)
    if (acc.hasAccount) {
      const cred = await inquirer.prompt(credentials.signin)
      const compare = await db.loginUser(cred)
      if (!compare.error && compare.compare) {
        mainMenu(compare.userId)
      } else {
        console.log(chalk.red('invalid credentials'))
      }
    } else {
      const cred = await inquirer.prompt(credentials.signup)
      const newUser = await db.createUser(cred)
      clear()
      main()
    }
  } catch (err) {
    console.log(chalk.red('Ha ocurrido un error'))
    process.exit(0)
  }
}