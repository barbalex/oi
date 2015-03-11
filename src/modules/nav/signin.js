/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl,
    initiateNav   = require('./initiateNav');

module.exports = function (signindata, newSignup) {
    var oiDb = new PouchDB('http://' + couchUrl + '/oi');

    // signin
    oiDb.login(signindata.name, signindata.password).then(function (response) {
        var login;

        console.log('login response: ', response);

        window.oi.me          = {};
        window.oi.me.name     = signindata.name;
        window.oi.me.password = signindata.password;
        login                 = response;

        // name in DB speichern
        // nachher auslagern, da auch nach signup
        if (signindata.remember) {
            localStorage.me_name     = signindata.name;
            localStorage.me_password = signindata.password;
        }
        // when first sync data for model is fetched from remote db instead of locally
        // better because data may not yet have arrived locally
        initiateNav(newSignup, login);
        $('#signinWithModal').modal('hide');
    }).catch(function (error) {
        if (error.name === 'unauthorized') {
            console.log('unauthorized');
            // name or password incorrect
            $('#signinAlertText').html('Anmeldung gescheitert:<br>Sie haben Email und/oder Passwort falsch eingegeben.<br>Oder müssen Sie ein Konto erstellen?');
            $('#signinAlert').show();
        } else {
            // cosmic rays, a meteor, etc.
            $('#signinAlertText').html('Anmeldung gescheitert:<br>Oh je. Die Anwendung ist offenbar schlecht gelaunt. Bitte versuchen Sie es nochmals. Gemeldeter Fehler:<br>' + JSON.stringify(error));
            $('#signinAlert').show();
        }
    });
};