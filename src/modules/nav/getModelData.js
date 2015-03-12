/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var _             = require('underscore'),
    getDataFromDb = require('./getDataFromDb'),
    createTree    = require('./createTree');

module.exports = function (projectNames, login) {
    var dbCount = 0;

    //console.log('getModelData: projectNames: ', projectNames);

    // empty model if exists
    window.oi.objects     = [];
    window.oi.hierarchies = [];

    _.each(projectNames, function (projectName) {
        getDataFromDb(projectName, login, function () {
            dbCount++;
            if (dbCount === projectNames.length) {
                // all projects have returned their data > create tree
                createTree();
            }
        });
    });

    if (!projectNames || projectNames.length === 0) {
        console.log('no projectNames passed');
    }
};