/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var _             = require('underscore'),
    getDataFromDb = require('./getDataFromDb'),
    createTree    = require('./createTree');

module.exports = function (projectNames, login) {

    //console.log('getModelData: projectNames: ', projectNames);

    // empty model if exists
    window.oi.objects     = [];
    window.oi.hierarchies = [];

    _.each(projectNames, function (projectName) {
        getDataFromDb(projectName, login);
    });

    createTree();

    if (!projectNames || projectNames.length === 0) {
        console.log('no projectNames passed');
    }
};