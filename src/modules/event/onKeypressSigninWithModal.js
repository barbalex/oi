'use strict'

var $ = require('jquery')

module.exports = function (event) {
  if (event.which === 13) {
    $('#signinWithModalSigninButton').trigger('click')
  }
}
