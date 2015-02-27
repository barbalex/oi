/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol         = require('openlayers'),
    proj4      = require('proj4'),
    wmtsSource = require('./wmtsSource');

module.exports = function () {
    var layerConfig,
        src_wmts_s3_swissimage,
        wmts_s3_swissimage;

    proj4.defs("EPSG:21781", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");

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