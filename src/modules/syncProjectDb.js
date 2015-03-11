/**
 * syncs data from a project-db with a local project-db in the pouch
 * starts the changes listener
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    configuration = require('./configuration'),
    couchUrl      = configuration.couch.dbUrl,
    handleChanges = require('./handleChanges');

function syncError(err) {
    console.log('error syncing: ', err);
}

module.exports = function (couchName) {
    var dbOptions = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        },
        syncOptions = {
            live: true,
            retry: true
        },
        changeOptions = {
            since:        'now',
            live:         true,
            include_docs: true
        },
        localDb         = new PouchDB(couchName),
        remoteDbAddress = 'http://' + couchUrl + '/' + couchName,
        remoteDb        = new PouchDB(remoteDbAddress, dbOptions);

    if (remoteDb) {
        // sync
        window.oi[couchName + '_sync'] = PouchDB.sync(localDb, remoteDb, syncOptions);
        // watch changes
        remoteDb.changes(changeOptions).on('change', handleChanges);
    }
};
