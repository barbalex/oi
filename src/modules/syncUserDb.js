/**
 * syncs data from a user-db with a local user-db in the pouch
 * starts the changes listener
 * syncs only once, then starts syncing persistently
 * that is because the pause event is needet do know when syncing has happened to get roles
 * and it fires repeatedly on persistant syncing
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

function syncUserDb(firstOnceThenLive) {
    var dbOptions,
        syncOptions,
        changeOptions,
        localDb,
        remoteDbAddress,
        remoteDb,
        userDbName,
        once,
        live;

    userDbName = getUserDbName();
    once       = firstOnceThenLive === 'firstOnceThenLive' ? true : false;
    live       = once;
    dbOptions = {
        auth: {
            username: window.oi.me.name,
            password: window.oi.me.password
        }
    };
    syncOptions = {
        live:  live,
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
        if (once) {
            // first sync
            // only once
            window.oi[userDbName + '_firstSync'] = PouchDB.sync(localDb, remoteDb, syncOptions);
            // now start syncing persistently
            syncUserDb();
        } else {
            window.oi[userDbName + '_sync'] = PouchDB.sync(localDb, remoteDb, syncOptions);
            // watch changes
            remoteDb.changes(changeOptions).on('change', handleChanges);
        }
    }
}

module.exports = function (firstOnceThenLive) {
    return syncUserDb(firstOnceThenLive);
};
