/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl,
    signIn        = require('./signIn'),
    oiDb          = new PouchDB('http://' + couchUrl + '/oi'),
    newSignup;

function comunicateError(html) {
    $('#signinAlertText').html(html);
    $('#signinAlert').show();
}

function signup(signindata) {
    // TODO: pass more data as metadata
    // see: https://github.com/nolanlawson/pouchdb-authentication#options
    oiDb.signup(signindata.name, signindata.password).then(function (response) {

        console.log('signed up, now sign in. response: ', response);

        signIn(signindata, newSignup);
    }).catch(function (error) {
        // Fehler melden
        if (error.name === 'conflict') {
            comunicateError('Fehler:<br>Diese Email-Adresse existiert schon<br>Wählen Sie eine andere');
        } else if (error.name === 'forbidden') {
            comunicateError('Fehler:<br>Diese Email-Adresse enthält ungültige Zeichen<br>Wählen Sie eine andere');
        } else {
            comunicateError('Fehler:<br>Das Konto konnte nicht erstellt werden.<br>Die Datenbank meldete:<br>' + error);
        }
    });
}

module.exports = function (signindata) {
    // when first sync data for model is fetched from remote db instead of locally
    // better because data may not yet have arrived locally
    newSignup = true;

    console.log('going to sign up. signindata: ', signindata);

    oiDb.getSession(function (error, response) {
        if (error) {
            return console.log('error getting session: ', error);
        }
        if (!response.userCtx.name) {
            // no one logged in, signup
            return signup(signindata);
        }
        if (signindata.name === response.userCtx.name) {
            // this person is already signed in
            return console.log(signindata.name + ' is already signed in');
        }
        // other user is logged in, log out first
        oiDb.logout(function () {
            signup(signindata);
        });
    });
};