'use strict'

const { modelUrl } = require('./setup')
const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')
const chalk = require('chalk')

let api = null
async function setup () {
  if (!api) {
    api = await modelUrl()
  }
}

module.exports = {
  async createUser ({ username, email, password }) {
    try {
      await setup()
      const pass = await bcrypt.hash(password, 10)
      const user = api.User.create({ username, email, password: pass })

      return user
    } catch (err) {
      return { error: err }
    }
  },
  async loginUser ({ username, password }) {
    try {
      await setup()
      const user = await api.User.findOne({ where: { username } })
      if (!user || !user.username) return { error: 'user not found' }

      const compare = await bcrypt.compare(password, user.password)
      return { compare, userId: user.id }
    } catch (err) {
      return { error: err }
    }
  },
  async listAllKeys ({ userId }) {
    try {
      await setup()
      const key = await api.Secret.findAll({ where: { userId } })
      const keys = []
      key.forEach(e => {
        const bytes  = CryptoJS.AES.decrypt(e.key, process.env.SECRET || 'secret');
        const plaintext = bytes.toString(CryptoJS.enc.Utf8)
        keys.push({ name: e.name, key: plaintext })
      })
      return keys
    } catch (err) {
      return { error: err }
    }
  },
  async saveSecret ({ name, key, userId }) {
    try {
      await setup()
      const _key = CryptoJS.AES.encrypt(key, process.env.SECRET || 'secret').toString()
      const sec = api.Secret.create({ name, key: _key, userId })
      if (!sec || !sec.name) return { error: 'error' }
      return sec
    } catch (err) {
      return { error: err }
    }
  },
  async verifySecret (userId, secret) {
    try {
      const sec = await api.Secret.findOne({ where: { userId, name: secret } })
      return sec
    } catch (err) {
      return { error: err }
    }
  },
  async deleteSecret (options, userId) {
    try {
      await setup()
      options.forEach(async el => await api.Secret.destroy({ where: { name: el, userId } }))
    } catch (err) {
      return { error: err }
    }
  },
  async updateSecret ({ name, newSecret, userId }) {
    try {
      await setup()
      const _key = CryptoJS.AES.encrypt(newSecret, process.env.SECRET || 'secret').toString()
      await api.Secret.update({ key: _key }, { where: { name, userId } })
    } catch (err) {
      return { error: err }
    }
  }
}