/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    ol             = require('openlayers'),
    showTab        = require('../showTab'),
    zoomToFeature  = require('../map/zoomToFeature'),
    getObject      = require('../getObject');

module.exports = function () {
    var objectData = $(this).prev().data('object'),
        object,
        feature;

    // open map
    showTab('map');
    // zoom to feature
    if (objectData) {
        object = getObject(objectData._id);
        if (object && object.data && object.data[objectData.label] && object.data[objectData.label].type && object.data[objectData.label].coordinates) {
            feature  = new ol.Feature();
            feature.setGeometry(new ol.geom[object.data[objectData.label].type](object.data[objectData.label].coordinates));
            zoomToFeature(feature, 200);
        }
    }
};