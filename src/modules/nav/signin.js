/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    PouchDB        = require('pouchdb'),
    pouchDbOptions = require('../pouchDbOptions');

module.exports = function () {
    var db = new PouchDB('oi', pouchDbOptions);
    // modal öffnen
    $('#signinWithModal').modal();

    // event-handler erzeugen
    $('body').on('click', '#signinWithModalLogin', function () {
        // signin oder signup?

        // Eingaben verifizieren

        // event-listener entfernen
        $('body').off('click', '#signinWithModalLogin');

        // wenn signup: zuerst signup
        db.signup('test@test.ch', 'myPassword', {
            metadata: {
                Nachname: 'Tester',
                Vorname: 'Test',
                Strasse: 'x-str 40',
                PLZ: 8000,
                Ort: 'ort'
            }
        }, function (err, response) {
            // etc.
        });

        // login in DB speichern
        db.put(login, '_local/login').then(function () {
            window.oi.login = login.name;
            goOn();
        }).catch(function (err) {
            console.log('error creating login: ', err);
        });
    });
};