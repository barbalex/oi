/**
 * syncs data from a project-db with a local project-db in the pouch
 * starts the changes listener
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    configuration = require('./configuration'),
    couchUrl      = configuration.couch.dbUrl,
    handleChanges = require('./handleChanges'),
    guid          = require('./guid');

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

    // make sure syncing and listening to changes is only started if not already started
    if (remoteDb && !window.oi.sync[projectName]) {
        // sync
        window.oi.sync[projectName] = PouchDB.sync(localDb, remoteDb, syncOptions).then(function (response) {
            console.log('syncProjectDb: response from syncing ' + projectName + ':', response);
        }).catch(function (error) {
            console.log('syncProjectDb: error from syncing ' + projectName + ':', error);
            if (error.status === 404) {
                // db not found
                // something must have gone wrong when the role was first added to the userDb
                // TODO: send a signal to the server to create db
                var oiDb    = new PouchDB('http://' + couchUrl + '/oi_messages', dbOptions),
                    message = {
                        _id: guid(),
                        type: "projectAdd",
                        projectName: projectName
                    };

                oiDb.put(message).then(function (response) {
                    console.log('syncProjectDb: response from messaging oi_messages to create new db ' + projectName + ':', response);
                }).catch(function (error) {
                    console.log('syncProjectDb: error from messaging oi_messages to create new db ' + projectName + ':', error);
                });
            }
        });
        // watch changes
        remoteDb.changes(changeOptions).on('change', handleChanges);

        console.log('syncProjectDb: syncing ' + projectName + ' with ' + remoteDbAddress);

    }
};