/**
 * synchronisiert die Daten aus einer CouchDB in PouchDB
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB        = require('pouchdb'),
    configuration  = require('./configuration'),
    couchUrl       = configuration.couch.dbUrl,
    handleChanges  = require('./handleChanges');

function syncError(err) {
    console.log('error syncing: ', err);
}

module.exports = function (couchName) {
    var options         = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        },
        localDb         = new PouchDB(couchName),
        remoteDbAddress = 'http://' + couchUrl + '/' + couchName,
        remoteDb        = new PouchDB(remoteDbAddress, options),
        syncOptions         = {
            //retry:        true,
            //since:        'now',
            live:         true,
            include_docs: true
        };

    if (remoteDb) {

        console.log('syncing with: ', remoteDbAddress);

        PouchDB.sync(localDb, remoteDb, syncOptions)
            .on('error',  syncError)
            .on('change', handleChanges);

        /*PouchDB.replicate(localDb, remoteDb, syncOptions)
            .on('error',  syncError)
            .on('change', handleChanges);

        PouchDB.replicate(remoteDb, localDb, syncOptions)
            .on('error',  syncError)
            .on('change', handleChanges);*/
    }
};
