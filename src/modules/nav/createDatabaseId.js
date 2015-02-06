/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                    = require('pouchdb'),
    initiateForeignChangeQuery = require('./initiateForeignChangeQuery'),
    pouchDbOptions             = require('../pouchDbOptions');

module.exports = function () {
    var databaseId = {},
        db         = new PouchDB('oi', pouchDbOptions);

    db.get('_local/databaseId', function (err, response) {
        if (err) {
            if (err.status === 404) {
                // document is missing > create new one and make it accessible as global variable
                databaseId.databaseId = Math.random();
                db.put(databaseId, '_local/databaseId', function (err, response) {
                    if (err) { return console.log('error creating databaseId: ', err); }
                    window.oi.databaseId = databaseId.databaseId;
                    initiateForeignChangeQuery();
                });
            } else {
                console.log('error retrieving databaseId: ', err);
            }
        } else {
            window.oi.databaseId = response.databaseId;
            initiateForeignChangeQuery();
        }
    });

};