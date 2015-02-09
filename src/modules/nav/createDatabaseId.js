/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB              = require('pouchdb'),
    initiateChangeStream = require('./initiateChangeStream'),
    pouchDbOptions       = require('../pouchDbOptions');

module.exports = function () {
    var databaseId = {},
        localDb    = new PouchDB('oi', pouchDbOptions);

    localDb.get('_local/databaseId').then(function (response) {
        window.oi.databaseId = response.databaseId;
        initiateChangeStream();
    }).catch(function (err) {
        if (err.status === 404) {
            // document is missing > create new one and make it accessible as global variable
            databaseId.databaseId = Math.random();
            localDb.put(databaseId, '_local/databaseId').then(function () {
                window.oi.databaseId = databaseId.databaseId;
                initiateChangeStream();
            }).catch(function (err) {
                console.log('error creating databaseId: ', err);
            });
        } else {
            console.log('error retrieving databaseId: ', err);
        }
    });

};