/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol           = require('openlayers'),
    createLayers = require('./createLayers');

module.exports = function () {
    // only build up map if not yet done
    if (!window.oi.olMap.map) {
        window.oi.olMap.map = new ol.Map({
            target: 'map',
            layers: createLayers(),
            view: new ol.View({
                center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                zoom: 4
            })
        });
    }
};