/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl,
    signIn        = require('./signIn');

module.exports = function (signindata) {
    var remoteDb = new PouchDB('http://' + couchUrl + '/oi'),
        newSignup;

    // when first sync data for model is fetched from remote db instead of locally
    // better because data may not yet have arrived locally
    newSignup = true;

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
        signIn(signindata, newSignup);
    }).catch(function (error) {
        // Fehler melden
        $('#signinAlertText').html('Das Konto konnte nicht erstellt werden.<br>Die Datenbank meldete:<br>' + error);
        $('#signinAlert').show();
    });
};