/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    ol             = require('openlayers'),
    toggleTab      = require('../toggleTab'),
    setWidthOfTabs = require('../setWidthOfTabs'),
    zoomToFeature  = require('../map/zoomToFeature'),
    getObject      = require('../getObject');

module.exports = function () {
    var objectData = $(this).prev().data('object'),
        object,
        show       = true,
        feature;

    // open map
    toggleTab('map', show);
    setWidthOfTabs();
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