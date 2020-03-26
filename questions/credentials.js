'use strict'

const signin = [
  { 
    type: 'input', 
    name: 'username', 
    message: 'Username',
    validate: ans => {
      if (ans.length === 0) return 'Type username'
      return true
    }
  },
  { 
    type: 'password', 
    name: 'password', 
    message: 'Password',
    validate: ans => {
      if (ans.length === 0) return 'Type password'
      return true
    }
  }
]

const signup = [
  { 
    type: 'input', 
    name: 'username', 
    message: 'Username',
    validate: ans => {
      if (ans.length === 0) return 'Type username'
      return true
    }
  },
  { 
    type: 'input', 
    name: 'email', 
    message: 'Email',
    validate: ans => {
      if (ans.length === 0) return 'Type email'
      return true
    }
  },
  { 
    type: 'password', 
    name: 'password', 
    message: 'Password',
    validate: ans => {
      if (ans.length === 0) return 'Type password'
      return true
    }
  }
]

const hasAccount = [
  { 
    type: 'confirm', 
    name: 'hasAccount', 
    message: 'Do you have an account?',
    default: true
  }
]

module.exports = {
  signup,
  signin,
  hasAccount
}