'use strict'

var openSigninModal = require('../nav/openSigninModal')

module.exports = function (event) {
  event.preventDefault()
  openSigninModal()
}
