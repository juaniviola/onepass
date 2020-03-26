#!/usr/bin/env node

'use strict'

const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')

const utils = require('./utils')

const letter = new Promise((resolve, reject) => {
  figlet('ONEPASS', function(err, data) {
    if (err) {
      reject(err)
      return
    }
    resolve(data)
  })
})

;(async function () {
  try {
    clear() // clear console
    const data = await letter
    console.log(chalk.yellow(data)) // print ONEPASS in ascii

    await utils()
  } catch (err) {
    console.log(chalk.red('Ha ocurrido un error!'))
    process.exit(1)
  }
})()
