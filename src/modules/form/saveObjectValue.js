/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                 = require('jquery'),
    dateformat        = require('dateformat'),
    _                 = require('underscore'),
    PouchDB           = require('pouchdb'),
    db                = new PouchDB('oi'),
    getLabelForObject = require('../nav/getLabelForObject'),
    getObjectWithId   = require('../getObjectWithId');

module.exports = function (id, field, value) {
    var object,
        lastEdited = {};

    // get data for object
    object = getObjectWithId(id);

    lastEdited.date = dateformat(new Date(), 'isoDateTime');
    // TODO: get real user
    lastEdited.user = 'z@z.ch';
    lastEdited.database = window.oi.databaseId;

    if (object) {
        // set new value
        object.data[field] = value || null;
        object.lastEdited = lastEdited;

        // write to pouch
        db.put(object, function (err, response) {
            if (err) { return console.log('error: ', err); }

            // update rev in model object
            object._rev = response.rev;

            // if field is nameField, update name in tree
            var correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                return hierarchy._id === object.hId;
            });
            if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === field) {
                $('#navContent').jstree().rename_node('#' + object._id, getLabelForObject(object, correspondingHierarchy));
            }
        });
    } else {
        console.log('Änderung wurde nicht gespeichert');
    }
};