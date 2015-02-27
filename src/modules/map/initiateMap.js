/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                      = require('openlayers'),
    proj4                   = require('proj4'),
    createLayers            = require('./createLayers'),
    addMousePositionControl = require('./addMousePositionControl');

module.exports = function () {
    proj4.defs("EPSG:21781", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");

    // only build up map if not yet done

    //center: [684297, 237600],
    //center: [902568.5270415349, 5969980.338127118],
    //center: [47.17188, 8.11776],
    //center: [8.16363, 47.12031],
    if (!window.oi.olMap.map) {
        var projection,
            extent,
            RESOLUTIONS;

        projection = ol.proj.get('EPSG:21781');

        console.log('projection: ', projection);

        // We have to set the extent!
        projection.setExtent([2420000, 130000, 2900000, 1350000]);
        extent = [2420000, 130000, 2900000, 1350000];
        RESOLUTIONS = [
            4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
            1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1, 0.05
        ];

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
                projection: projection,
                maxZoom: 17,
                center: [2801719.584192617, 1133560.6877229365],
                zoom: 15,
                minZoom: 2,
                extent: extent,
                resolutions: RESOLUTIONS
            })
        });
        addMousePositionControl();
    }
};