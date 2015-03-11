/*
 * leitet je nach Typ des Dokuments an die zuständige Funktion weiter
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                     = require('pouchdb'),
    handleExternalObjectChanges = require('./handleExternalObjectChanges'),
    handleUserChanges           = require('./handleUserChanges');

module.exports = function (change) {
    var doc;

    if (change.doc && change.doc.type) {
        doc = change.doc;
        switch (doc.type) {
        case 'user':
            handleUserChanges(doc);
            break;
        case 'object':
            handleExternalObjectChanges(doc);
            break;
        }
    }
};