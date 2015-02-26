/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                 = require('jquery'),
    dateformat        = require('dateformat'),
    _                 = require('underscore'),
    PouchDB           = require('pouchdb'),
    getLabelForObject = require('../nav/getLabelForObject'),
    getObject         = require('../getObject'),
    syncWithRemoteDb  = require('../syncWithRemoteDb');

module.exports = function (passedObject, value) {

    console.log('saveObjectValue: passedObject: ', passedObject);

    var projId      = passedObject.projId,
        projectName = 'project_' + projId,
        id          = passedObject._id,
        field       = passedObject.label,
        inputType   = passedObject.inputType,
        object,
        lastEdited  = {},
        options     = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        },
        localDb     = new PouchDB(projectName, options);

    // get data for object
    object              = getObject(id);
    // build lastEdited
    lastEdited.date     = dateformat(new Date(), 'isoDateTime');
    lastEdited.user     = window.oi.me.name;
    lastEdited.database = window.oi.databaseId;

    // bei geoJson: Value in Objekt verwandeln
    if (inputType === 'geoJson') {
        value = JSON.parse(value);
    }

    if (object) {
        // set new value
        object.data[field] = value || null;
        object.lastEdited  = lastEdited;
        // write to pouch
        localDb.put(object)
            .then(function (response) {

                console.log('response from saving object: ', response);

                // check if this was a new project
                if (!object._rev) {
                    // TODO: new project: start syncing

                    // TODO: tell when new project
                    // write object ALSO to oi that is listened to from oi_pg
                    // then start syncing

                    console.log('starting to sync with new db: ', projectName);
                    // give oi_pg time to create the new db
                    setTimeout(function () {
                        syncWithRemoteDb(projectName);
                    }, 1000);
                }

                // update rev in model object
                object._rev = response.rev;

                // if field is nameField, update name in tree
                var correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                    return hierarchy._id === object.hId;
                });
                if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === field) {
                    $('#navContent').jstree().rename_node('#' + object._id, getLabelForObject(object, correspondingHierarchy));
                }
            })
            .catch(function (err) {
                console.log('error: ', err);
            });
    } else {
        console.log('Änderung wurde nicht gespeichert');
    }
};