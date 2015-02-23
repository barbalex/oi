/*
 * leitet je nach Typ des Dokuments an die zuständige Funktion weiter
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var handleExternalObjectChanges = require('./handleExternalObjectChanges'),
    handleUsersChanges          = require('./handleUsersChanges');

module.exports = function (change) {

    //console.log('change: ', change);

    if (change.doc && change.doc.type) {
        var doc = change.doc;
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