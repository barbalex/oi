/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var _             = require('underscore'),
    getDataFromDb = require('./getDataFromDb');

module.exports = function (firstSync, projectNames, callback) {
    var projectsGotten = 0,
        errors = [];

    //console.log('getModelData: projectNames: ', projectNames);

    _.each(projectNames, function (projectName) {
        getDataFromDb(firstSync, projectName, function (error, done) {
            if (error) {
                console.log('got an error getting data from ' + projectName + ': ', error);
                errors.push(error);
                if (errors.length === projectNames.length) {
                    return callback(errors, false);
                }
            }
            if (done) {
                projectsGotten++;
                if (projectsGotten === projectNames.length) {
                    return callback(errors, true);
                }
            }
        });
    });
    // allways return the callback
    // even if there are no project names
    if (!projectNames || projectNames.length === 0) {

        console.log('calling back after no projectNames');

        return callback(null, false);
    }
};