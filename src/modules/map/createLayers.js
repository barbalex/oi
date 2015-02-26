/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _               = require('underscore'),
    ol              = require('openlayers'),
    createWmtsLayer = require('./createWmtsLayer');

module.exports = function () {
    var layers = [],
        mapQuestSat,
        swisstopoPixel;

    mapQuestSat = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
    });

    swisstopoPixel = createWmtsLayer(20140520);

    layers.push(swisstopoPixel);

    return layers;
};