/*
 * initiiert die nav
 * 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                       = require('underscore'),
    async                   = require('async'),
    addDataOfProjectToModel = require('./addDataOfProjectToModel');

module.exports = function (firstSync, projectNames, callback) {
    var functions = [];

    // create globals for data (primitive self-built models)
    window.oi.hierarchies = [];
    window.oi.objects     = [];

    // loop through projects
    // add their data to the model

    // TODO: use async.parralel to execute array of functions parralel and know when they are finished
    /*_.each(projectNames, function (projectName) {
        functions.push(addDataOfProjectToModel(firstSync, projectName));
    });*/

    async.each(projectNames, function (projectName, callback) {
        callback(addDataOfProjectToModel(firstSync, projectName));
    }, function (error, results) {
        console.log('results from getting model data: ', results);
        callback(error, results);
    });
};