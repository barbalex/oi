/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                      = require('openlayers'),
    createLayers            = require('./createLayers'),
    addMousePositionControl = require('./addMousePositionControl');

module.exports = function () {
    // only build up map if not yet done
    if (!window.oi.olMap.map) {
        window.oi.olMap.map = new ol.Map({
            target: 'map',
            logo: false,
            controls: ol.control.defaults({
                attributionOptions: {
                    collapsible: false
                }
            }),
            layers: createLayers(),
            view: new ol.View({
                maxZoom: 17,
                center: [902568.5270415349, 5969980.338127118],
                zoom: 15,
                minZoom: 2
            })
        });
        addMousePositionControl();
    }
};