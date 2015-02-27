/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                                   = require('underscore'),
    ol                                  = require('openlayers'),
    createLayerSwisstopoPixelkarteFarbe = require('./createLayerSwisstopoPixelkarteFarbe'),
    createLayerSwisstopoAerial          = require('./createLayerSwisstopoAerial');

module.exports = function () {
    var layers = [],
        mapQuestSat,
        SwisstopoPixelkarteFarbe;

    mapQuestSat = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
    });

    SwisstopoPixelkarteFarbe = createLayerSwisstopoPixelkarteFarbe(20140520);

    layers.push(createLayerSwisstopoAerial());

    return layers;
};