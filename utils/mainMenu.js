'use strict'

const inquirer = require('inquirer')
const { menu } = require('../questions')
const { listAllKeys, addKey, updateKey, deleteKey } = require('./mainMenuUtils')

module.exports = async function mainMenu(userId) {
  const options = await inquirer.prompt(menu)

  switch (options.mainMenu) {
    case 'List all keys':
      await listAllKeys(userId)
      await mainMenu(userId)
      break

    case 'Add key':
      await addKey(userId)
      await mainMenu(userId)
      break

    case 'Update key':
      await updateKey(userId)
      await mainMenu(userId)
      break

    case 'Delete key':
      await deleteKey(userId)
      await mainMenu(userId)
      break

    case 'Quit':
      process.exit(0)

    default:
      process.exit(0)
  }
}