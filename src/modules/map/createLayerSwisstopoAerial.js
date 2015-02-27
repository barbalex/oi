/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol         = require('openlayers'),
    proj4      = require('proj4'),
    wmtsSource = require('./wmtsSource');

module.exports = function () {
    var layerConfig,
        src_wmts_s3_swissimage,
        wmts_s3_swissimage;

    layerConfig = {
        attribution:     "swisstopo",
        format:          "jpeg",
        serverLayerName: "ch.swisstopo.swissimage",
        attributionUrl:  "http://www.swisstopo.admin.ch/internet/swisstopo/de/home.html",
        topics:          "api,luftbilder,swissmaponline",
        label:           "SWISSIMAGE",
        timestamps: [
            "20151231",
            "20140620",
            "20131107",
            "20130916",
            "20130422",
            "20120809",
            "20120225",
            "20110914",
            "20110228"
        ],
        type: "wmts"
    };

    src_wmts_s3_swissimage = wmtsSource(layerConfig.serverLayerName, layerConfig);

    wmts_s3_swissimage = new ol.layer.Tile({
        source: src_wmts_s3_swissimage
    });

    return wmts_s3_swissimage;
};