/*
 * is passed a layerName
 * returns the corresponding layer
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers'),
    _  = require('underscore');

module.exports = function (layerName) {
    var layer,
        layers;

    layers = window.oi.olMap.map.getLayers().getArray();
    layer = _.find(layers, function (layer) {
        return layer.get('layerName') === layerName;
    });
    return layer;
};