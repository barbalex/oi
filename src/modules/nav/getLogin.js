/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB        = require('pouchdb'),
    pouchDbOptions = require('../pouchDbOptions'),
    signin         = require('./signin');

module.exports = function () {
    var login = {},
        db    = new PouchDB('oi', pouchDbOptions);

    db.get('_local/login').then(function (response) {
        window.oi.login = response.name;
        goOn();
    }).catch(function (err) {
        if (err.status === 404) {
            signin();
        } else {
            console.log('error retrieving login: ', err);
        }
    });

};