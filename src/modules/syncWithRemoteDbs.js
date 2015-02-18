/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                = require('underscore'),
    syncWithRemoteDb = require('./syncWithRemoteDb');

module.exports = function (projectDbs) {
    _.each(projectDbs, function (projectDb) {
        syncWithRemoteDb(projectDb);
    });
};
