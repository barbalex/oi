/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                 = require('jquery'),
    dateformat        = require('dateformat'),
    _                 = require('underscore'),
    PouchDB           = require('pouchdb'),
    getLabelForObject = require('../nav/getLabelForObject'),
    getObject         = require('../getObject');

module.exports = function (passedObject, value) {
    var projId      = passedObject.projId,
        projectName = 'project_' + projId,
        id          = passedObject._id,
        field       = passedObject.label,
        object,
        lastEdited  = {},
        options     = {
            auth: {
                username: window.oi.me.name,
                password: window.oi.me.password
            }
        }
        localDb     = new PouchDB(projectName, options);

    console.log('saveObjectValue: projectName: ', projectName);

    // get data for object
    object              = getObject(id);
    // build lastEdited
    lastEdited.date     = dateformat(new Date(), 'isoDateTime');
    lastEdited.user     = window.oi.me.name;
    lastEdited.database = window.oi.databaseId;

    if (object) {
        // set new value
        object.data[field] = value || null;
        object.lastEdited  = lastEdited;

        console.log('putting object: ', object);

        // write to pouch
        localDb.put(object)
            .then(function (response) {

                console.log('response from putting: ', response);

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