/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _            = require('underscore'),
    ol           = require('openlayers'),
    extendExtent = require('./extendExtent');

module.exports = function (passedData) {
    var vectorLayer,
        vectorSource,
        vectorSourceObjects,
        olFeatureArray = [],
        hId            = passedData.hId,
        label          = passedData.label,
        layerName      = passedData.layerName,
        layerTitle     = passedData.layerTitle;

    // extract all objects with this hId from Model
    vectorSourceObjects = _.filter(window.oi.objects, function (object) {
        return object.hId === hId;
    });

    _.each(vectorSourceObjects, function (object) {
        var geomData,
            feature;

        geomData = object.data[label];
        if (geomData) {
            feature  = new ol.Feature();
            feature.setGeometry(new ol.geom[geomData.type](geomData.coordinates));
            olFeatureArray.push(feature);
        }
    });

    vectorSource = new ol.source.Vector();
    vectorSource.addFeatures(olFeatureArray);

    vectorLayer = new ol.layer.Vector({
        layerTitle:  layerTitle,
        layerName:   layerName,
        layerGroup:  'projects',
        objId:       passedData._id,
        projId:      passedData.projId || null,
        visible:     true,
        source:      vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 4
            }),
            fill: new ol.style.Fill({
                color: 'red'
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 4
                })
            })
        })
    });

    window.oi.olMap.map.addLayer(vectorLayer);
};