/**
 * syncs data from a user-db with a local user-db in the pouch
 * starts the changes listener
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB           = require('pouchdb'),
    configuration     = require('./configuration'),
    couchUrl          = configuration.couch.dbUrl,
    handleUserChanges = require('./handleUserChanges'),
    getUserDbName     = require('./getUserDbName');

module.exports = function () {
    var dbOptions,
        syncOptions,
        changeOptions,
        localDb,
        remoteDbAddress,
        remoteDb,
        userDbName,
        changeListener;

    window.oi.sync = window.oi.sync || {};

    dbOptions = {
        auth: {
            username: window.oi.me.name,
            password: window.oi.me.password
        }
    };
    syncOptions = {
        live:  true,
        retry: true
    };
    changeOptions = {
        since:        'now',
        live:         true,
        include_docs: true
    };
    userDbName      = getUserDbName();
    localDb         = new PouchDB(userDbName);
    remoteDbAddress = 'http://' + couchUrl + '/' + userDbName;
    remoteDb        = new PouchDB(remoteDbAddress, dbOptions, function (error, response) {
        if (error) {
            return console.log('syncUserDb: error instantiating remote db ' + remoteDbAddress + ' with username ' + dbOptions.auth.username + ' and password ' + dbOptions.auth.password + ':', error);
        }

        console.log('syncUserDb: response from instantiating remote db ' + remoteDbAddress + ' with username ' + dbOptions.auth.username + ' and password ' + dbOptions.auth.password + ':', response);

        // make sure syncing and listening to changes is only started if not already started
        if (remoteDb && !window.oi.sync[userDbName]) {

            //console.log('dbOptions: ', dbOptions);

            // watch changes
            changeListener = remoteDb.changes(changeOptions).on('change', handleUserChanges);
            // add listener to array so it can be canceled later
            window.oi.changes.push(changeListener);

            // sync
            window.oi.sync[userDbName] = PouchDB.sync(localDb, remoteDb, syncOptions, function (error, response) {
                if (error) { return console.log('syncUserDb: error syncing with ' + userDbName + ':', error); }
                console.log('syncUserDb: syncing ' + userDbName + ' with ' + remoteDbAddress + ', response:', response);
            });
        }
    });
};
