/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol         = require('openlayers'),
    proj4      = require('proj4'),
    wmtsSource = require('./wmtsSource');

module.exports = function () {
    var layerConfig,
        srcWmtsS3Swissimage,
        wmtsS3Swissimage;

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

    srcWmtsS3Swissimage = wmtsSource(layerConfig.serverLayerName, layerConfig);

    wmtsS3Swissimage = new ol.layer.Tile({
        source: srcWmtsS3Swissimage,
        group: 'background'
    });

    return wmtsS3Swissimage;
};