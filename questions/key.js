'use strict'

const db = require('../db')

const key = function (userId) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Name secret',
      async validate (el) {
        const verify = await db.verifySecret(userId, el)
        if (!verify || !verify.name) {
          return true
        } else {
          return 'Key name already exist!'
        }
        if (el.length === 0) return 'Type name'

        return true
      }
    },
    {
      type: 'input',
      name: 'key',
      message: 'Secret',
      validate (el) {
        if (el.length === 0) return 'Type key'
        return true
      }
    }
  ] 
}

module.exports = key