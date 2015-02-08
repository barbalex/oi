/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB         = require('pouchdb'),
    pouchDbOptions  = require('../pouchDbOptions'),
    openSigninModal = require('./openSigninModal'),
    initiateNav     = require('./initiateNav'),
    tellWithModal   = require('../tellWithModal');

module.exports = function () {
    var db = new PouchDB('http://localhost:5984/oi', pouchDbOptions);

    db.get('_local/login_name').then(function (response) {
        window.oi.loginName = response.name;
        initiateNav();
    }).catch(function (error) {
        if (error.status === 404) {
            openSigninModal();
        } else {
            console.log('error retrieving login: ', error);
            openSigninModal();
        }
    });

};