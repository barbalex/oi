/**
 * syncs data from a project-db with a local project-db in the pouch
 * starts the changes listener
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                     = require('pouchdb'),
    configuration               = require('./configuration'),
    couchUrl                    = configuration.couch.dbUrl,
    handleExternalObjectChanges = require('./handleExternalObjectChanges'),
    guid                        = require('./guid');

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
        remoteDb,
        changeListener;

    remoteDb = new PouchDB(remoteDbAddress, dbOptions, function (error) {
        if (error) { console.log('syncProjectDb: error instantiating remote db ' + remoteDbAddress + ':', error); }

        // make sure syncing and listening to changes is only started if not already started
        if (remoteDb && !window.oi.sync[projectName]) {
            // sync
            // dont use promise or a promis will be returned instead of a sync object
            window.oi.sync[projectName] = PouchDB.sync(localDb, remoteDb, syncOptions, function (error, response) {
                if (error) {
                    console.log('syncProjectDb: error from syncing ' + projectName + ':', error);
                    if (error.status === 404) {
                        // db not found
                        // something must have gone wrong when the role was first added to the userDb
                        // send a signal to the server to create db
                        var oiDb,
                            message = {
                                _id: guid(),
                                type: "projectAdd",
                                projectName: projectName
                            };

                        oiDb = new PouchDB('http://' + couchUrl + '/oi_messages', dbOptions, function (error) {
                            if (error) { console.log('syncProjectDb: error instantiating remote oi_messages db:', error); }

                            oiDb.put(message).then(function (response) {
                                console.log('syncProjectDb: response from messaging oi_messages to create new db ' + projectName + ':', response);
                            }).catch(function (error) {
                                console.log('syncProjectDb: error from messaging oi_messages to create new db ' + projectName + ':', error);
                            });
                        });
                    }
                } else {
                    console.log('syncProjectDb: response from syncing ' + projectName + ':', response);
                }
            });
            // watch changes
            changeListener = remoteDb.changes(changeOptions).on('change', handleExternalObjectChanges);
            // add listener to array so it can be canceled later
            window.oi.changes.push(changeListener);

            //console.log('syncProjectDb: syncing ' + projectName + ' with ' + remoteDbAddress);

        }
    });
};