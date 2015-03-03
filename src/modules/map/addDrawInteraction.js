/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol          = require('openlayers'),
    $           = require('jquery'),
    guid        = require('../guid'),
    saveFeature = require('./saveFeature');

module.exports = function (layer, geometryType) {
    var map = window.oi.olMap.map,
        drawInteraction;

    // create the interaction
    drawInteraction = new ol.interaction.Draw({
        source: layer.getSource(),
        type: /** @type {ol.geom.GeometryType} */ (geometryType)
    });
    // add it to the map
    map.addInteraction(drawInteraction);
    // make it global so it can be cancelled
    window.oi.olMap.map.drawInteraction = drawInteraction;

    // when a new feature has been drawn...
    drawInteraction.on('drawend', function (event) {
        // create a unique id
        // it is later needed to delete features
        var id = guid();
        // give the feature this id
        event.feature.setId(id);
        // ...save the changed data
        saveFeature(event.feature);
    });
};