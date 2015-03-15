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

var PouchDB                        = require('pouchdb'),
    _                              = require('underscore'),
    configuration                  = require('./configuration'),
    couchUrl                       = configuration.couch.dbUrl,
    guid                           = require('./guid');

module.exports = function () {
    var projHierarchy,
        projHierarchyGuid,
        projObject,
        projObjectGuid,
        localDb,
        syncOptions,
        replicationOptions,
        projectName,
        remoteDbUrl,
        remoteDb,
        dbOptions;

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
    // add docs to new local project-db
    projectName = 'project_' + projObjectGuid;
    localDb     = new PouchDB(projectName);
    localDb.put(projObject).then(function (response) {
        return localDb.put(projHierarchy);
    }).then(function (response) {
        // sync docs to remote project-db making sure the remote db is created 
        syncOptions = {
            live:  true,
            retry: true
        };
        replicationOptions = {
            create_target: true
        };
        dbOptions = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        };
        remoteDbUrl = 'http://' + couchUrl + '/' + projectName;
        remoteDb    = new PouchDB(remoteDbUrl, dbOptions);
        // first replicate once because using PouchDB.sync does not seem to work (?)
        PouchDB.replicate(localDb, remoteDb, replicationOptions).setMaxListeners(20);
        // sync permanently
        // assing sync to a global variable so it can be stopped later (if project-db is removed)
        window.oi[projectName + '_sync'] = PouchDB.sync(localDb, remoteDb, syncOptions).setMaxListeners(20);

        console.log('syncing with ' + projectName);

    }).catch(function (err) {
        console.log('error saving first project: ', err);
    });
};