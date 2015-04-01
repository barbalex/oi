/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $             = require('jquery'),
    PouchDB       = require('pouchdb'),
    configuration = require('../configuration'),
    couchUrl      = configuration.couch.dbUrl,
    signIn        = require('./signIn'),
    getUserDbName = require('../getUserDbName'),
    oiDb,
    newSignup,
    userDbName,
    userDb,
    userDoc;

function comunicateError(html) {
    $('#signinAlertText').html(html);
    $('#signinAlert').show();
}

function signup(oiDb, signindata) {
    // TODO: pass more data as metadata
    // see: https://github.com/nolanlawson/pouchdb-authentication#options
    oiDb.signup(signindata.name, signindata.password).then(function (response) {

        console.log('signed up, now sign in. response: ', response);

        // create user db
        userDbName = getUserDbName(signindata.name);
        userDb     = new PouchDB(userDbName);
        userDoc    = {
            _id: response.id,
            name: signindata.name
        };
        userDb.put(userDoc).then(function () {
            console.log('created userDb ' + userDbName);
            signIn(signindata, newSignup);
        }).catch(function (error) {
            console.log('error creating userDb ' + userDbName + ': ', error);
        });
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
    // after signin data for model is fetched from remote db instead of locally
    // better because data may not yet have arrived locally through syncing
    newSignup = true;

    console.log('going to sign up. signindata: ', signindata);

    oiDb = new PouchDB('http://' + couchUrl + '/oi_messages', function (error) {
        if (error) { console.log('error instantiating oi db:', error); }

        oiDb.getSession(function (error, response) {
            if (error) { return console.log('error getting session: ', error); }
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
                signup(oiDb, signindata);
            });
        });
    });
};