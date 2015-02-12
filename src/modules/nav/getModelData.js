/*
 * initiiert die nav
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                     = require('underscore'),
    getModelDataOfProject = require('./getModelDataOfProject');

module.exports = function (firstSync, projectNames, callback) {
    var resultsArray;

    // loop through projectNames
    // get their data
    resultsArray = _.map(projectNames, function (projectName) {
        return getModelDataOfProject(firstSync, projectName);
    });

    // create globals for data (primitive self-built models)
    window.oi.hierarchies = [];
    window.oi.objects     = [];

    _.each(resultsArray, function (result) {
        if (result && result.hierarchies) {
            window.oi.hierarchies.push(result.hierarchies);
        }
        if (result && result.objects) {
            window.oi.objects.push(result.objects);
        }
    });

    callback();
};