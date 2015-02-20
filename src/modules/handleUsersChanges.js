/*
 * When the active user's _users-object is changed, it checks it's roles:
 * - if a role has been deleted, the corresponding project is removed and syncing stopped 
 * - if a role has been added, the corresponding project is added and syncing added 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (user) {
    var userName = user.name,
        rootObjects,
        rootObjectsProjectNames,
        projectsToAdd,
        projectsToRemove;

    if (userName === window.oi.me.name) {
        rootObjects = _.filter(window.oi.objects, function (object) {
            return !object.parent;
        });
        rootObjectsProjectNames = _.map(rootObjects, function (rootObject) {
            return 'project_' + rootObject._id;
        });

        // projects to be removed:
        projectsToRemove = _.difference(rootObjectsProjectNames, user.roles);
        // projects to be added:
        projectsToAdd    = _.difference(user.roles, rootObjectsProjectNames);

        console.log('rootObjects: ', rootObjects);
        console.log('rootObjectsProjectNames: ', rootObjectsProjectNames);
        console.log('projectsToRemove: ', projectsToRemove);
        console.log('projectsToAdd: ', projectsToAdd);
    }
};