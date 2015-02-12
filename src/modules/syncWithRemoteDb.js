/**
 * synchronisiert die Daten aus einer CouchDB in PouchDB
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB        = require('pouchdb'),
    pouchDbOptions = require('./pouchDbOptions'),
    configuration  = require('./configuration'),
    couchUrl       = configuration.couch.dbUrl,
    couchName      = configuration.couch.dbName,
    handleChanges  = require('./handleChanges');

function syncError(err) {
    console.log('error syncing: ', err);
}

module.exports = function (couchName) {
    var localDb  = new PouchDB('oi', pouchDbOptions),
        remoteDb = 'http://' + couchUrl + '/' + couchName,
        options  = {
            retry:        true,
            since:        'now',
            live:         true,
            include_docs: true
        };

    if (remoteDb) {
        PouchDB.sync(localDb, remoteDb, options)
            .on('error',  syncError)
            .on('change', handleChanges);
    }
};
