'use strict'

var $ = require('jquery'),
  signIn = require('./signIn'),
  signUp = require('./signUp'),
  validateEmail = require('../validateEmail')

function validSignin (signindata) {
  var validName,
    validPassword,
    valid

  validName = signindata.name && validateEmail(signindata.name)
  validPassword = !!signindata.password
  valid = validName && validPassword

  return valid
}

function validSignup (signupdata) {
  // name and password were validated. check rest
  // TODO: now only password match. Add more later
  var passwordsMatch,
    valid

  passwordsMatch = signupdata.password === signupdata.password2
  valid = passwordsMatch

  return valid
}

module.exports = function () {
  var signindata = {},
    signup = $('#signinWithModalSignupCheckbox').is(':checked')

  signindata.name = $('#signinWithModalEmail').val()
  signindata.password = $('#signinWithModalPassword').val()
  signindata.password2 = $('#signinWithModalPassword2').val()
  signindata.remember = $('#signinWithModalRemember').is(':checked')

  // Eingabe von Name und Passwort validieren
  if (!validSignin(signindata)) {
    $('#signinAlertText').html('Anmeldung gescheitert<br>Bitte prüfen Sie Ihre Eingaben')
    $('#signinAlert').show()
    return
  }

  // signin oder signup?
  if (signup) {
    // Eigabe der Metadaten validieren
    if (!validSignup(signindata)) {
      $('#signinAlertText').html('Anmeldung gescheitert<br>Bitte prüfen Sie Ihre Eingaben')
      $('#signinAlert').show()
      return
    }
    signUp(signindata)
    return
  }
  signIn(signindata)
}
