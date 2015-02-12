/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB          = require('pouchdb'),
    syncWithRemoteDb = require('./syncWithRemoteDb'),
    configuration    = require('./configuration'),
    couchUrl         = configuration.couch.dbUrl,
    couchName        = configuration.couch.dbName;

module.exports = function (firstSync) {
    var projectDbs = [],
        remoteDb   = 'http://' + couchUrl + '/' + couchName,
        localDb    = new PouchDB('oi', pouchDbOptions);

    // TODO: Get projects when not firstSync, otherwise get user roles from _users
    // initialte syncing with userdb and all projectDb's
    if (firstSync) {
        remoteDb.get('org.couchdb.user:' + window.oi.loginName).then(function (user) {

        }).catch(function (error) {
            console.log('error getting user data: ', error);
        });
    } else {
        
    }
};