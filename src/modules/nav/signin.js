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

    // login in DB speichern
    db.put(login, '_local/login').then(function () {
        window.oi.login = login.name;
        goOn();
    }).catch(function (err) {
        console.log('error creating login: ', err);
    });
};