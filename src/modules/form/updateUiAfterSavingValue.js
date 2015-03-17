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
    _                     = require('underscore'),
    ol                    = require('openlayers'),
    getLabelForObject     = require('../nav/getLabelForObject'),
    capitalizeFirstLetter = require('../capitalizeFirstLetter'),
    getLayerByName        = require('../map/getLayerByName'),
    getFeatureById        = require('../map/getFeatureById');

module.exports = function (object, value, field, inputType, featureCoordinatesBefore) {
    var layer,
        layerName,
        feature,
        geomType,
        featureGeom,
        featureCoordinates,
        correspondingHierarchy,
        selectionFeature;

    // if field is nameField, update name in tree
    correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
        return hierarchy._id === object.hId;
    });
    if (object.data && correspondingHierarchy && correspondingHierarchy.nameField && correspondingHierarchy.nameField === field) {
        $('#navContent').jstree().rename_node('#' + object._id, getLabelForObject(object, correspondingHierarchy));
    }
    // if field is geoGson, update feature on map
    if (inputType === 'geoJson') {
        layerName = 'layer' + capitalizeFirstLetter(correspondingHierarchy.name) + capitalizeFirstLetter(field);
        layer     = getLayerByName(layerName);
        feature   = getFeatureById(layer, object._id);
        if (value) {
            geomType           = value.type;
            featureCoordinates = value.coordinates;
            featureGeom        = new ol.geom[geomType](featureCoordinates);
            feature.setGeometry(featureGeom);
        } else {
            // remove feature
            layer.getSource().removeFeature(feature);
        }
        // if feature is selected, move selection feature too
        // find feature in select interaction with same coordinates
        if (featureCoordinatesBefore) {
            selectionFeature = _.find(window.oi.olMap.map.selectInteraction.getFeatures().getArray(), function (selectFeature) {
                // need to stringify the arrays to test if they are equal
                return JSON.stringify(selectFeature.getGeometry().getCoordinates()) === JSON.stringify(featureCoordinatesBefore);
            });
            // move it
            if (selectionFeature) {
                if (value) {
                    selectionFeature.setGeometry(featureGeom);
                } else {
                    window.oi.olMap.map.selectInteraction.getFeatures().remove(selectionFeature);
                }
            }
        }
    }
};