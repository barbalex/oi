/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var PouchDB                        = require('pouchdb'),
    _                              = require('underscore'),
    configuration                  = require('../configuration'),
    couchUrl                       = configuration.couch.dbUrl,
    createTreeNodeObject           = require('./createTreeNodeObject'),
    createTreeNodeRootObject       = require('./createTreeNodeRootObject'),
    createChildHierarchiesOfObject = require('./createChildHierarchiesOfObject'),
    guid                           = require('../guid');

function setupFirstProject() {
    var projHierarchy,
        projHierarchyGuid,
        projObject,
        projObjectGuid,
        localDb,
        syncOptionsSync,
        syncOptionsReplication,
        projectName,
        remoteDbAddress,
        remoteDb;

    console.log('setting up first project');

    // the user has no data yet
    // add standard project
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
    window.oi.objects.push(projObject);
    window.oi.hierarchies.push(projHierarchy);
    projectName     = 'project_' + projObjectGuid;
    localDb         = new PouchDB(projectName);
    remoteDbAddress = 'http://' + couchUrl + '/' + projectName;
    remoteDb        = new PouchDB(remoteDbAddress);
    localDb.put(projObject).then(function (response) {
        return localDb.put(projHierarchy);
    }).then(function (response) {
        syncOptionsSync = {
            live:  true,
            retry: true
        };
        syncOptionsReplication = {
            create_target: true
        };
        // first replicate once because syncing does not seem to work
        PouchDB.replicate(localDb, remoteDb, syncOptionsReplication).setMaxListeners(20);
        window.oi[projectName + '_sync'] = PouchDB.sync(localDb, remoteDb, syncOptionsSync).setMaxListeners(20);

        console.log('syncing with ' + projectName);

    }).catch(function (err) {
        console.log('error saving first project: ', err);
    });
}

module.exports = function () {
    var objectsData          = [],
        childHierarchiesData = [],
        obj,
        dat;

    if (window.oi.objects.length === 0) {
        setupFirstProject();
    }

    _.each(window.oi.objects, function (object) {
        if (object && (object.parent || object.parent === null)) {
            obj = object.parent === null ? createTreeNodeRootObject(object) : createTreeNodeObject(object);
            if (obj) {
                objectsData.push(obj);
            }
        }
    });

    _.each(window.oi.objects, function (object) {
        dat = createChildHierarchiesOfObject(object);
        if (dat.length > 0) {
            childHierarchiesData = _.union(childHierarchiesData, dat);
        }
    });

    return _.union(objectsData, childHierarchiesData);
};