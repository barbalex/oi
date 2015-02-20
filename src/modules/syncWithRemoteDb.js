/**
 * synchronisiert die Daten aus einer CouchDB in PouchDB
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB        = require('pouchdb'),
    pouchDbOptions = require('./pouchDbOptions'),
    configuration  = require('./configuration'),
    couchUrl       = configuration.couch.dbUrl,
    handleChanges  = require('./handleChanges');

function syncError(err) {
    console.log('error syncing: ', err);
}

module.exports = function (couchName) {
    var localDb  = new PouchDB(couchName, pouchDbOptions),
        remoteDbAddress = 'http://' + window.oi.me.name + ':' + window.oi.me.password + '@' + couchUrl + '/' + couchName,
        remoteDb = new PouchDB(remoteDbAddress),
        options  = {
            retry:        true,
            //since:        'now',
            live:         true,
            include_docs: true
        };

    console.log('remoteDbAddress: ', remoteDbAddress);

    if (remoteDb) {

        console.log('sync couchName: ', couchName);

        /*PouchDB.sync(localDb, remoteDb, options)
            .on('error',  syncError)
            .on('change', handleChanges);*/

        PouchDB.replicate(localDb, remoteDb, options)
            .on('error',  syncError)
            .on('change', handleChanges);

        PouchDB.replicate(remoteDb, localDb, options)
            .on('error',  syncError)
            .on('change', handleChanges);
    }
};
