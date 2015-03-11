/**
 * syncs data from a user-db with a local user-db in the pouch
 * starts the changes listener
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    configuration = require('./configuration'),
    couchUrl      = configuration.couch.dbUrl,
    handleChanges = require('./handleChanges'),
    getUserDbName = require('./getUserDbName');

function syncError(err) {
    console.log('error syncing: ', err);
}

module.exports = function () {
    var dbOptions,
        syncOptions,
        changeOptions,
        localDb,
        remoteDbAddress,
        remoteDb,
        userDbName;

    userDbName = getUserDbName();
    dbOptions = {
        auth: {
            username: window.oi.me.name,
            password: window.oi.me.password
        }
    };
    syncOptions = {
        live: true,
        retry: true
    };
    changeOptions = {
        since:        'now',
        live:         true,
        include_docs: true
    };
    localDb         = new PouchDB(userDbName);
    remoteDbAddress = 'http://' + couchUrl + '/' + userDbName;
    remoteDb        = new PouchDB(remoteDbAddress, dbOptions);

    if (remoteDb) {
        // sync
        window.oi[userDbName + '_sync'] = PouchDB.sync(localDb, remoteDb, syncOptions);
        // watch changes
        remoteDb.changes(changeOptions).on('change', handleChanges);
    }
};
