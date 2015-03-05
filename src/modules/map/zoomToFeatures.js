/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol           = require('openlayers'),
    _            = require('underscore'),
    extendExtent = require('./extendExtent');

module.exports = function (features, buffer) {
    var featuresExtent,
        featureExtent,
        featuresExtentEnlarged;

    featuresExtent = ol.extent.createEmpty();
    _.each(features, function (feature) {
        featureExtent = feature.getGeometry().getExtent();
        ol.extent.extend(featuresExtent, featureExtent);
    });
    featuresExtentEnlarged = extendExtent(featuresExtent, buffer || 200);
    ol.extent.extend(featuresExtent, featuresExtentEnlarged);
    window.oi.olMap.map.getView().fitExtent(featuresExtent, window.oi.olMap.map.getSize());
};