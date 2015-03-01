/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                              = require('underscore'),
    ol                             = require('openlayers'),
    createLayerSwisstopoPixelFarbe = require('./createLayerSwisstopoPixelFarbe'),
    createLayerSwisstopoAerial     = require('./createLayerSwisstopoAerial');

module.exports = function () {
    var layers = [],
        mapQuestSat;

    mapQuestSat = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
    });

    window.oi.olMap.map.addLayer(createLayerSwisstopoPixelFarbe());
    window.oi.olMap.map.addLayer(createLayerSwisstopoAerial());
};