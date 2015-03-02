/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol          = require('openlayers'),
    $           = require('jquery'),
    saveFeature = require('./saveFeature');

module.exports = function (layer, geometryType) {
    var map = window.oi.olMap.map,
        drawInteraction;

    console.log('addDrawInteraction: layer: ', layer);

    // create the interaction
    drawInteraction = new ol.interaction.Draw({
        source: layer.getSource(),
        type: /** @type {ol.geom.GeometryType} */ (geometryType)
    });
        // add it to the map
    map.addInteraction(drawInteraction);

    // when a new feature has been drawn...
    drawInteraction.on('drawend', function (event) {
        // save the changed data
        console.log('drawend: event: ', event);
        console.log('drawend: feature: ', event.feature);
        saveFeature(event.feature);
    });
};