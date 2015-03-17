/*
 * creates the first project if a user has none yet
 * 1. creates project-hierarchy (metadata for project-doc)
 * 2. creates project-doc
 * 3. adds these docs to the model
 * 4. creates new local project db and adds these docs
 * 5. syncs local project db to remote couch, opting to create the db on the remote couch
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB         = require('pouchdb'),
    _               = require('underscore'),
    configuration   = require('./configuration'),
    couchUrl        = configuration.couch.dbUrl,
    guid            = require('./guid'),
    addRoleToUserDb = require('./addRoleToUserDb');

module.exports = function () {
    var projHierarchy,
        projHierarchyGuid,
        projObject,
        projObjectGuid,
        projectDb,
        projectName;

    console.log('setting up first project');

    // the user has no data yet
    // add standard project

    // first create hierarchy- and object-doc for the project
    projHierarchyGuid = guid();
    projObjectGuid    = guid();
    projHierarchy = {
        "_id": projHierarchyGuid,
        "type": "hierarchy",
        "parent": null,
        "projId": projObjectGuid,
        "name": "Projekte",
        "nameField": "Projektname",
        "users": [window.oi.me.name],
        "lastEdited": {"date": null, "user": null, "database": null},
        "fields": [
            {
                "label": "Projektname",
                "inputType": "input",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            },
            {
                "label": "Bemerkungen",
                "inputType": "textarea",
                "valueList": [],
                "order": 1,
                "inputDataType": "",
                "standardValue": ""
            }
        ]
    };
    projObject = {
        "_id": projObjectGuid,
        "type": "object",
        "hId": projHierarchyGuid,
        "parent": null,
        "projId": projObjectGuid,
        "users": [window.oi.me.name],
        "lastEdited": {"date": null, "user": null, "database": null},
        "data": {
            "Projektname": "Mein erstes Projekt",
            "Bemerkungen": null
        }
    };
    // add docs to model
    window.oi.objects.push(projObject);
    window.oi.hierarchies.push(projHierarchy);

    projectName = 'project_' + projObjectGuid;
    // add role to user in userDb
    // userDb syncs role to server
    // server script then creates projectDb in couch
    addRoleToUserDb(projectName);
    // add docs to new local project-db
    projectDb   = new PouchDB(projectName);
    projectDb.put(projObject).then(function (response) {
        projObject._rev = response.rev;
    }).catch(function (err) {
        console.log('error saving first projects object: ', err);
    });
    projectDb.put(projHierarchy).then(function (response) {
        projHierarchy._rev = response.rev;
    }).catch(function (err) {
        console.log('error saving first projects hierarchy: ', err);
    });
};