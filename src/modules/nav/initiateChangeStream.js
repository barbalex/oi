/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                     = require('pouchdb'),
    handleExternalObjectChanges = require('../handleExternalObjectChanges'),
    foreignChangedIndex         = require('./foreignChangedIndex'),
    pouchDbOptions              = require('../pouchDbOptions');

module.exports = function () {
    var db = new PouchDB('http://localhost:5984/oi', pouchDbOptions);

    // TODO: filter only the users documents
    // TODO: watch changes to hierarchies
    // when changes happen in DB, update model and when necessary ui
    db.changes({
        since: 'now',
        live: true,
        include_docs: true,
        filter: foreignChangedIndex(),
        key: 'object'
    }).on('change', handleExternalObjectChanges);
};