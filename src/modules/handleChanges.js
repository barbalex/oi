/*
 * leitet je nach Typ des Dokuments an die zuständige Funktion weiter
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                     = require('pouchdb'),
    handleExternalObjectChanges = require('./handleExternalObjectChanges'),
    handleUsersChanges          = require('./handleUsersChanges');

module.exports = function (change) {
    var doc;

    if (change.doc && change.doc.type) {
        doc = change.doc;
        switch (doc.type) {
        case 'user':
            handleUsersChanges(doc);
            break;
        case 'object':
            handleExternalObjectChanges(doc);
            break;
        }
    }
};