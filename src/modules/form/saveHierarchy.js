/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                 = require('jquery'),
    dateformat        = require('dateformat'),
    _                 = require('underscore'),
    PouchDB           = require('pouchdb'),
    pouchDbOptions    = require('../pouchDbOptions'),
    getLabelForObject = require('../nav/getLabelForObject'),
    getHierarchy      = require('../getHierarchy');

module.exports = function (hierarchy) {
    var lastEdited = {},
        localDb    = new PouchDB('oi', pouchDbOptions);

    // build lastEdited
    lastEdited.date     = dateformat(new Date(), 'isoDateTime');
    lastEdited.user     = window.oi.me.name;
    lastEdited.database = window.oi.databaseId;

    // set new value
    hierarchy.lastEdited  = lastEdited;

    // write to pouch
    localDb.put(hierarchy)
        .then(function (response) {
            // update rev in model object
            hierarchy._rev = response.rev;

            // TODO: if field is nameField, update name in tree
            /*var correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                return hierarchy._id === object.hId;
            });
            if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === field) {
                $('#navContent').jstree().rename_node('#' + object._id, getLabelForObject(object, correspondingHierarchy));
            }*/
        })
        .catch(function (err) {
            console.log('error: ', err);
        });
};