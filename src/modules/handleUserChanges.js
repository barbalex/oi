/*
 * When the active user's _users-object is changed, it checks it's roles:
 * - if a role has been deleted, the corresponding project is removed and syncing stopped 
 * - if a role has been added, the corresponding project is added and syncing added
 *
 * also:
 * if the userDoc is new, then this user had already an account
 * but signed in on this machine for the first time
 * so we need to initiate the ui after the change event
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                           = require('underscore'),
    PouchDB                     = require('pouchdb'),
    getUserDbName               = require('./getUserDbName'),
    getProjectNamesToInitiateUi = require('./nav/getProjectNamesToInitiateUi');

module.exports = function (change) {
    var userDoc  = change.doc,
        userName = userDoc.name,
        userDbName,
        userDb,
        rootObjects,
        rootObjectsProjectNames,
        projectsToAdd,
        projectsToRemove;

    if (userName === window.oi.me.name) {
        // check the revs
        userDbName = getUserDbName();
        userDb     = new PouchDB(userDbName);
        userDb.get(change.id, { revs_info: true }, function (error, doc) {
            if (error) { return console.log('error getting revs of doc: ', error); }

            var revisions = doc._revs_info;

            //console.log('handleChangesInUserDb: change: ', change);
            //console.log('handleChangesInUserDb: revisions: ', revisions);

            if (revisions.length === 1) {
                // this is a new user doc
                // need to initiate ui
                getProjectNamesToInitiateUi(null);
            }
        });


        rootObjects = _.filter(window.oi.objects, function (object) {
            return !object.parent;
        });
        rootObjectsProjectNames = _.map(rootObjects, function (rootObject) {
            return 'project_' + rootObject._id;
        });

        // projects to be removed:
        projectsToRemove = _.difference(rootObjectsProjectNames, userDoc.roles);
        // projects to be added:
        projectsToAdd    = _.difference(userDoc.roles, rootObjectsProjectNames);

        // TODO: remove projectsToRemove?
        // remove from model, map and nav
        // remove db if no other user?

        // TODO: add projectsToAdd?
        // add to model, nav and map

        console.log('rootObjects: ', rootObjects);
        console.log('rootObjectsProjectNames: ', rootObjectsProjectNames);
        console.log('projectsToRemove: ', projectsToRemove);
        console.log('projectsToAdd: ', projectsToAdd);
    }
};