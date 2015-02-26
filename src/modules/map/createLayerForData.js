/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                                   = require('underscore'),
    ol                                  = require('openlayers');

module.exports = function (hId, label) {
    var vectorLayer,
        vectorSource,
        vectorSourceObjects,
        vectorSourceFeatures;

    // extract all objects with this hId from Model
    vectorSourceObjects = _.filter(window.oi.objects, function (object) {
        return object.hId === hId;
    });

    // jetzt die Geometrien extrahieren
    vectorSourceFeatures = _.map(vectorSourceObjects, function (object) {
        if (object.data && object.data[label]) {
            var feature = {
                    "type": "Feature",
                    "geometry": object.data[label],
                    "properties": {"label": label}
                };
            return feature;
        }
    });

    console.log('vectorSourceFeatures: ', JSON.stringify(vectorSourceFeatures));

    var oops = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326'
            }
        },
        'features': vectorSourceFeatures
    };

    console.log('vectorSource: ', JSON.stringify(oops));

    vectorSource = new ol.source.GeoJSON({
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857'
            }
        },
        'features': vectorSourceFeatures
    });

    vectorLayer = new ol.layer.Vector({
        title:  label,
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'magenta',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'magenta'
            }),
            image: new ol.style.Circle({
                radius: 10,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'magenta'
                })
            })
        })
    });

    window.oi.olMap.map.addLayer(vectorLayer);
};