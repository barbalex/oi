/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                    = require('pouchdb'),
    initiateForeignChangeQuery = require('./initiateForeignChangeQuery'),
    pouchDbOptions             = require('../pouchDbOptions');

module.exports = function () {
    var databaseId = {},
        db         = new PouchDB('http://localhost:5984/oi', pouchDbOptions);

    db.get('_local/databaseId').then(function (response) {
        window.oi.databaseId = response.databaseId;
        initiateForeignChangeQuery();
    }).catch(function (err) {
        if (err.status === 404) {
            // document is missing > create new one and make it accessible as global variable
            databaseId.databaseId = Math.random();
            db.put(databaseId, '_local/databaseId').then(function () {
                window.oi.databaseId = databaseId.databaseId;
                initiateForeignChangeQuery();
            }).catch(function (err) {
                console.log('error creating databaseId: ', err);
            });
        } else {
            console.log('error retrieving databaseId: ', err);
        }
    });

};