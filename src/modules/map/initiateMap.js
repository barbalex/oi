/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                   = require('openlayers'),
    proj4                = require('proj4'),
    createLayers         = require('./createLayers'),
    mousePositionControl = require('./mousePositionControl');

module.exports = function () {
    // only build up map if not yet done

    //center: [684297, 237600],
    //center: [902568.5270415349, 5969980.338127118],
    //center: [47.17188, 8.11776],
    //center: [8.16363, 47.12031],
    if (!window.oi.olMap.map) {
        var projection,
            RESOLUTIONS;

        projection = ol.proj.get('EPSG:21781');
        // We have to set the extent!
        projection.setExtent([2420000, 130000, 2900000, 1350000]);
        //projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);
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
            }).extend([
                new ol.control.ScaleLine({
                    units: 'metric'
                }),
                mousePositionControl()
            ]),
            layers: createLayers(),
            view: new ol.View({
                projection: projection,
                center: [2701719, 1173560],
                zoom: 16,
                resolutions: RESOLUTIONS
            })
        });
    }
};