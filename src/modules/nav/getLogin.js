'use strict'

var openSigninModal = require('./openSigninModal'),
  getProjectNamesToInitiateUi = require('./getProjectNamesToInitiateUi')

module.exports = function () {
  var loginName = window.localStorage.me_name

  if (loginName) {
    window.oi.me = {}
    window.oi.me.name = loginName
    window.oi.me.password = window.localStorage.me_password
    getProjectNamesToInitiateUi(null)
  } else {
    openSigninModal()
  }
}
