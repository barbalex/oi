/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                     = require('pouchdb'),
    handleExternalObjectChanges = require('../handleExternalObjectChanges'),
    handleUsersChanges          = require('../handleUsersChanges'),
    pouchDbOptions              = require('../pouchDbOptions');

module.exports = function () {
    var localDb       = new PouchDB('oi', pouchDbOptions),
        remoteUsersDb = new PouchDB('http://localhost:5984/_users');

    // TODO: watch changes to hierarchies
    // when changes happen in DB, update model and when necessary ui
    // create filter function
    // should filter: 
    // - doc.lastEdited.database !== window.oi.databaseId
    // - user is in users
    // - doc.type = type
    // use changesFilter if req can be dynamically passed

    localDb.changes({
        since:        'now',
        live:         true,
        include_docs: true
    }).on('change', handleExternalObjectChanges);

    remoteUsersDb.changes({
        since:        'now',
        live:         true,
        include_docs: true
    }).on('change', handleUsersChanges);
};