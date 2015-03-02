/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers'),
    $  = require('jquery'),
    _  = require('underscore');

module.exports = function (feature) {
    var format = new ol.format.GeoJSON(),
        // this will be the data in the chosen format
        data,
        map,
        layers,
        layer;

    map    = window.oi.olMap.map;
    layers = map.getLayers().getArray();
    layer  = _.filter(layers, function (layer) {
        return layer.get('editing') === true;
    })[0];

    // convert the data of the layer into GeoJson
    data = format.writeFeatures(feature);
    console.log('saveFeature: data: ', data);
    //$('#data').val(JSON.stringify(data, null, 4));
};