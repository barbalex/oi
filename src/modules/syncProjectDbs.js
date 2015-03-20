/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _             = require('underscore'),
    syncProjectDb = require('./syncProjectDb');

module.exports = function (projectDbs) {

    //console.log('syncProjectDbs: syncing projects', projectDbs);

    _.each(projectDbs, function (projectDb) {
        syncProjectDb(projectDb);
    });
};
