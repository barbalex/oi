'use strict'

var $ = require('jquery')

module.exports = function () {
  if ($(this).is(':checked')) {
    $('#signinWithModalPassword2').parent().show()
    $('#signinWithModalSigninButton').text('Konto erstellen und anmelden')
    // wenn Email und Passwort erfasst sind, wiederholen fokussieren
    if ($('#signinWithModalEmail').val() && $('#signinWithModalPassword').val()) {
      $('#signinWithModalPassword2').focus()
    }
  } else {
    $('#signinWithModalPassword2').parent().hide()
    $('#signinWithModalSigninButton').text('anmelden')
  }
  $('#signinAlert').hide()
}
