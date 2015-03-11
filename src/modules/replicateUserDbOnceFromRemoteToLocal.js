/**
 * syncs data from a user-db with a local user-db in the pouch
 * syncs only once
 * that is because the pause event is needed do know when syncing has happened to get the roles
 * and the pause event fires repeatedly on persistant syncing
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    configuration = require('./configuration'),
    couchUrl      = configuration.couch.dbUrl,
    getUserDbName = require('./getUserDbName');

module.exports = function () {
    var dbOptions,
        syncOptions,
        localDb,
        remoteDbAddress,
        remoteDb,
        userDbName;

    console.log('replicateUserDbOnceFromRemoteToLocal');

    dbOptions = {
        auth: {
            username: window.oi.me.name,
            password: window.oi.me.password
        }
    };
    syncOptions = {
        live:  false,
        retry: true
    };
    userDbName      = getUserDbName();
    localDb         = new PouchDB(userDbName);
    remoteDbAddress = 'http://' + couchUrl + '/' + userDbName;
    remoteDb        = new PouchDB(remoteDbAddress, dbOptions);

    if (remoteDb) {

        console.log('replicateUserDbOnceFromRemoteToLocal: starting replication');

        // sync once from remote to local
        window.oi[userDbName + '_firstReplication'] = PouchDB.replicate(remoteDb, localDb, syncOptions);

        console.log('replicateUserDbOnceFromRemoteToLocal: started replication');
    }
};
