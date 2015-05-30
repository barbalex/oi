'use strict'

var initiateForObject = require('./initiateForObject'),
  initiateForHierarchy = require('./initiateForHierarchy')

module.exports = function (id, type) {
  switch (type) {
    case 'object':
      initiateForObject(id)
      break
    case 'hierarchy':
      initiateForHierarchy()
      break
  }
}
