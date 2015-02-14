/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _             = require('underscore'),
    getDataFromDb = require('./getDataFromDb');

module.exports = function (firstSync, projectNames, callback) {
    var projectsGotten = 0,
        errors = [];

    _.each(projectNames, function (projectName) {
        getDataFromDb(firstSync, projectName, function (error, done) {
            if (error) {
                errors.push(error);
                if (errors.length === projectNames.length) {
                    return callback(errors, false);
                }
            }
            if (done) {
                projectsGotten ++;
                if (projectsGotten === projectNames.length) {
                    return callback(errors, true);
                }
            }
        });
    });
};