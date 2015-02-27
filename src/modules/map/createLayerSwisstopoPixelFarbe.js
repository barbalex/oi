/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol         = require('openlayers'),
    proj4      = require('proj4'),
    wmtsSource = require('./wmtsSource');

module.exports = function () {
    var layerConfig,
        srcWmtsS3PixelFarbe,
        wmtsS3PixelFarbe;

    layerConfig = {
        attribution:     "swisstopo",
        format:          "jpeg",
        serverLayerName: "ch.swisstopo.pixelkarte-farbe",
        attributionUrl:  "http://www.swisstopo.admin.ch/internet/swisstopo/de/home.html",
        topics:          "api,luftbilder,swissmaponline",
        label:           "Landeskarten",
        timestamps: [
            "20151231",
            "20151231",
            "20140520",
            "20140106",
            "20130903",
            "20130213",
            "20120809",
            "20111206",
            "20111027",
            "20110401"
        ],
        type: "wmts"
    };

    srcWmtsS3PixelFarbe = wmtsSource(layerConfig.serverLayerName, layerConfig);

    wmtsS3PixelFarbe = new ol.layer.Tile({
        source: srcWmtsS3PixelFarbe,
        group: 'background'
    });

    return wmtsS3PixelFarbe;
};