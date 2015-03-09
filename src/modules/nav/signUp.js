/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl,
    signIn        = require('./signIn');

module.exports = function (signindata) {
    var remoteDb = new PouchDB('http://' + couchUrl + '/oi');
    // signup, then call signin

    console.log('signindata.name: ', signindata.name);
    console.log('signindata.password: ', signindata.password);

    remoteDb.signup(signindata.name, signindata.password, {
        metadata: {
            // bei signup weitere Felder ausfüllen lassen
            // genug, um eine Rechnung schicken zu können?
            /*Nachname: 'Tester',
            Vorname: 'Test',
            Strasse: 'x-str 40',
            PLZ: 8000,
            Ort: 'ort'*/
        }
    }).then(function () {
        signIn(signindata);
    }).catch(function (error) {
        // Fehler melden
        $('#signinAlertText').html('Das Konto konnte nicht erstellt werden.<br>Die Datenbank meldete:<br>' + error);
        $('#signinAlert').show();
    });
};