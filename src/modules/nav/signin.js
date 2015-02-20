/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl,
    tellWithModal = require('../tellWithModal'),
    initiateNav   = require('./initiateNav');

module.exports = function (signindata) {
    var remoteDb = new PouchDB('http://' + couchUrl + '/oi');
    // signin
    remoteDb.login(signindata.name, signindata.password).then(function (response) {
        window.oi.me          = {};
        window.oi.me.name     = signindata.name;
        window.oi.me.password = signindata.password;
        // name in DB speichern
        // nachher auslagern, da auch nach signup
        if (signindata.remember) {
            localStorage.me_name     = signindata.name;
            localStorage.me_password = signindata.password;
        }
        // when first sync, pass roles
        // then data for model is fetched from remote db
        initiateNav(response.roles);
        $('#signinWithModal').modal('hide');
    }).catch(function (error) {
        if (error.name === 'unauthorized') {
            // name or password incorrect
            tellWithModal('Anmeldung gescheitert', 'Sie haben Email und/oder Passwort falsch eingegeben. Oder müssen Sie ein Konto erstellen?');
        } else {
            // cosmic rays, a meteor, etc.
            tellWithModal('Anmeldung gescheitert', 'Oh je. Die Anwendung ist offenbar schlecht gelaunt. Bitte versuchen Sie es nochmals. Gemeldeter Fehler: ' + JSON.stringify(error));
        }
    });
};