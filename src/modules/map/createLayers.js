/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _  = require('underscore'),
    ol = require('openlayers');

module.exports = function () {
    var layers = [],
        mapQuestSat;

    mapQuestSat = new ol.layer.Tile({
        source: new ol.source.MapQuest({layer: 'sat'})
    });

    layers.push(mapQuestSat);

    return layers;
};