/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB            = require('pouchdb'),
    handleUsersChanges = require('./handleUsersChanges'),
    configuration      = require('./configuration'),
    couchUrl           = configuration.couch.dbUrl;

module.exports = function () {
    var remoteUsersDb = new PouchDB('http://' + couchUrl + '/_users');

    remoteUsersDb.changes({
        since:        'now',
        live:         true,
        include_docs: true
    }).on('change', handleUsersChanges);
};