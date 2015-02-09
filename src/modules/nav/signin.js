/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    PouchDB        = require('pouchdb'),
    tellWithModal  = require('../tellWithModal'),
    initiateNav    = require('./initiateNav');

module.exports = function (signindata) {
    var db = new PouchDB('http://localhost:5984/oi');

    PouchDB.plugin(require('pouchdb-authentication'));

    // signin
    db.login(signindata.name, signindata.password).then(function (response) {
        window.oi.loginName = signindata.name;
        // name in DB speichern
        // nachher auslagern, da auch nach signup
        if (signindata.remember) {
            localStorage.loginName = signindata.name;
        }
        initiateNav();
        $('#signinWithModal').modal('hide');
    }).catch(function (error) {

        console.log('error from db.login: ', error);

        if (error.name === 'unauthorized') {
            // name or password incorrect
            tellWithModal('Anmeldung gescheitert', 'Sie haben Email und/oder Passwort falsch eingegeben. Oder müssen Sie ein Konto erstellen?');
        } else {
            // cosmic rays, a meteor, etc.
            tellWithModal('Anmeldung gescheitert', 'Oh je. Die Anwendung ist offenbar schlecht gelaunt. Bitte versuchen Sie es nochmals. Gemeldeter Fehler: ' + JSON.stringify(error));
        }
    });
};