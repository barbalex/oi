/**
 * synchronisiert die Daten aus einer CouchDB in PouchDB
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB       = require('pouchdb'),
    db            = new PouchDB('oi'),
    configuration = require('./configuration'),
    couchUser     = configuration.couch.userName,
    couchPassword = configuration.couch.passWord,
    couchUrl      = configuration.couch.dbUrl,
    couchName     = configuration.couch.dbName,
    remoteCouch   = 'http://' + couchUser + ':' + couchPassword + '@' + couchUrl + '/' + couchName;

module.exports = function () {
    function syncError() {
        console.log('error syncing');
    }

    function sync() {
        var opts = {live: true};
        db.replicate.to(remoteCouch, opts, syncError);
        db.replicate.from(remoteCouch, opts, syncError);
    }

    if (remoteCouch) { sync(); }
};
