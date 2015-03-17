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

module.exports = function (projectName) {
    var dbOptions = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        },
        syncOptions = {
            live:  true,
            retry: true
        },
        changeOptions = {
            since:        'now',
            live:         true,
            include_docs: true
        },
        localDb         = new PouchDB(projectName),
        remoteDbAddress = 'http://' + couchUrl + '/' + projectName,
        remoteDb        = new PouchDB(remoteDbAddress, dbOptions);

    console.log('syncProjectDb: syncing project ', projectName);

    // make sure syncing and listening to changes is only started if not already started
    if (remoteDb && !window.oi[projectName + '_sync']) {
        // sync
        window.oi[projectName + '_sync'] = PouchDB.sync(localDb, remoteDb, syncOptions).setMaxListeners(20);
        // watch changes
        remoteDb.changes(changeOptions).on('change', handleChanges);

        console.log('watching changes for db ' + projectName);

    }
};
