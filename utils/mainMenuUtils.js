'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const clear = require('clear')
const db = require('../db')
const { credentials, key, selectKey } = require('../questions')

module.exports = {
  async listAllKeys (userId) {
    const keys = await db.listAllKeys({ userId })
    console.log(keys)
    clear()
    console.log(chalk.black.bgCyan('\nNAME - SECRET'))
    keys.forEach(el => {
      console.log(chalk.blue(`${el.name} - ${el.key}`))
    })
  },

  async addKey (userId) {
    const sec = await inquirer.prompt(key(userId))
    sec.userId = userId
    await db.saveSecret(sec)
    console.log(chalk.black.bgGreen('Key saved!'))
  },

  async updateKey (userId) {
    const uKeys = await db.listAllKeys({ userId })
    const choice = []
    uKeys.forEach(el => choice.push(el.name))
    if (choice.length === 0) return
    const option = await inquirer.prompt(selectKey.updateKey(uKeys))
    const newSecret = await inquirer.prompt(selectKey.update)
    await db.updateSecret({ name: option.update, newSecret: newSecret.secret, userId })
    console.log(chalk.black.bgGreen('updated'))
  },

  async deleteKey (userId) {
    const dKeys = await db.listAllKeys({ userId })
    const choices = []
    dKeys.forEach(el => choices.push(el.name))
    if (choices.length === 0) return
    const options = await inquirer.prompt(selectKey.deleteKeys(dKeys))
    await db.deleteSecret(options.delete, userId)
    console.log(chalk.black.bgGreen('Deleted'))
  }
}