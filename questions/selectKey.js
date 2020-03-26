'use strict'

function deleteKeys (choices) {
  return [
    {
      type: 'checkbox', 
      name: 'delete', 
      message: 'Select an option',
      choices
    } 
  ]
}

function updateKey (choices) {
  return [
    {
      type: 'list', 
      name: 'update', 
      message: 'Select an option',
      choices
    } 
  ]
}

const update = [
  {
    type: 'input',
    name: 'secret',
    message: 'Type new secret',
    validate (val) {
      if (val.length === 0) return 'Type secret'
      return true
    }
  }
]

module.exports = { deleteKeys, updateKey, update }