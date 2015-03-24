/*
 * makes model data accessible in model
 * by populating model with the data from all the user's project db's
 * model is:
 * - window.oi.objects: list of all objects
 * - window.oi.hierarchies: list of all hierarchies (metadata of objects)
 * when model is populated the nav tree is created
 */

/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var _             = require('underscore'),
    getDataFromDb = require('./getDataFromDb'),
    createTree    = require('./createTree');

module.exports = function (projectNames, login) {
    var dbCount = 0;

    // empty model if exists
    window.oi.objects     = [];
    window.oi.hierarchies = [];

    _.each(projectNames, function (projectName) {
        getDataFromDb(projectName, login, function () {

            console.log('callback calling');

            dbCount++;

            console.log('callback dbCount:', dbCount);
            console.log('callback projectNames.length:', projectNames.length);
            console.log('callback window.oi.objects:', window.oi.objects);

            if (dbCount === projectNames.length) {
                // all projects have returned their data > create tree

                console.log('callback create tree');

                createTree();
            }
        });
    });

    if (!projectNames || projectNames.length === 0) {
        console.log('no projectNames passed');
        // create tree
        // will add first project
        createTree();
    }
};