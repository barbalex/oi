/*
 * when a value is changed in the form
 * it is passed together with other information wrapped in an object
 * this function manages:
 * - saving the value to the database
 * - updating the navigation tree
 * - updating the map when geometries were changed
 * - creating new project-databases and starting syncing with them
 -   when a new project was created
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    dateformat            = require('dateformat'),
    _                     = require('underscore'),
    ol                    = require('openlayers'),
    PouchDB               = require('pouchdb'),
    getLabelForObject     = require('../nav/getLabelForObject'),
    getObject             = require('../getObject'),
    syncWithRemoteDb      = require('../syncWithRemoteDb'),
    capitalizeFirstLetter = require('../capitalizeFirstLetter'),
    getLayerByName        = require('../map/getLayerByName'),
    getFeatureById        = require('../map/getFeatureById');

module.exports = function (passedObject, value) {
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

        //console.log('object: ', object);
        //console.log('object stringified: ', JSON.stringify(object, null, 4));

        localDb.put(object)
            .then(function (response) {
                var layer,
                    layerName,
                    feature,
                    geomType,
                    featureGeom,
                    featureCoordinates,
                    correspondingHierarchy;

                console.log('response from put: ', response);

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
                correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
                    return hierarchy._id === object.hId;
                });
                if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === field) {
                    $('#navContent').jstree().rename_node('#' + object._id, getLabelForObject(object, correspondingHierarchy));
                }
                // if field is geoGson, update feature on map
                if (inputType === 'geoJson') {
                    layerName          = 'layer' + capitalizeFirstLetter(correspondingHierarchy.name) + capitalizeFirstLetter(passedObject.label);
                    layer              = getLayerByName(layerName);
                    feature            = getFeatureById(layer, object._id);
                    geomType           = value.type;
                    featureCoordinates = value.coordinates;
                    featureGeom        = new ol.geom[geomType](featureCoordinates);
                    feature.setGeometry(featureGeom);
                    // if feature is selected, move selection feature too
                    
                }
            })
            .catch(function (err) {
                console.log('saveObjectValue: error: ', err);
            });
    } else {
        console.log('Änderung wurde nicht gespeichert');
    }
};