'use strict'

var $ = require('jquery'),
  _ = require('underscore'),
  PouchDB = require('pouchdb'),
  configuration = require('../configuration'),
  couchUrl = configuration.couch.dbUrl,
  getProjectNamesToInitiateUi = require('./getProjectNamesToInitiateUi')

function comunicateError (html) {
  $('#signinAlertText').html(html)
  $('#signinAlert').show()
}

function signin (oiDb, signindata) {
  // signin
  oiDb.login(signindata.name, signindata.password).then(function (response) {
    var login

    console.log('signin: login response: ', response)

    window.oi.me = {}
    window.oi.me.name = signindata.name
    window.oi.me.password = signindata.password
    login = response

    // name in DB speichern
    // nachher auslagern, da auch nach signup
    if (signindata.remember) {
      window.localStorage.me_name = signindata.name
      window.localStorage.me_password = signindata.password
    }
    // when first sync data for model is fetched from remote db instead of locally
    // better because data may not yet have arrived locally
    getProjectNamesToInitiateUi(login)
    $('#signinWithModal').modal('hide')
  }).catch(function (error) {
    if (error.name === 'unauthorized') {
      // name or password incorrect
      comunicateError('Anmeldung gescheitert:<br>Sie haben Email und/oder Passwort falsch eingegeben.<br>Oder müssen Sie ein Konto erstellen?')
    } else {
      // cosmic rays, a meteor, etc.
      comunicateError('Anmeldung gescheitert:<br>Oh je. Die Anwendung ist offenbar schlecht gelaunt. Bitte versuchen Sie es nochmals. Gemeldeter Fehler:<br>' + JSON.stringify(error))
    }
  })
}

module.exports = function (signindata) {
  var oiDb = new PouchDB('http://' + couchUrl + '/oi_messages', function (error, response) {
    if (error) { return console.log('signin: error instantiating remote oi db:', error); }

    console.log('signin, signindata: ', signindata)

    // stop all syncs
    // in case user is changed and previous user's syncs are still running
    _.each(window.oi.sync, function (value, key) {
      if (window.oi.sync[key]) {
        window.oi.sync[key].cancel()
        delete window.oi.sync[key]
      }
    })
    // cancel all changes listeners
    _.each(window.oi.changes, function (change) {
      change.cancel()
    })
    // now remove them
    window.oi.changes = []

    oiDb.getSession(function (error, response) {
      if (error) { return console.log('error getting session: ', error) }
      if (!response.userCtx.name) {
        // no one logged in, log in
        return signin(oiDb, signindata)
      }
      if (signindata.name === response.userCtx.name) {
        // this person is already signed in
        console.log(signindata.name + ' is already signed in')
        return signin(oiDb, signindata)
      }
      // other user is logged in, log out first
      oiDb.logout(function () {
        signin(oiDb, signindata)
      })
    })
  })
}
