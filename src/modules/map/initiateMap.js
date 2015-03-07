/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                       = require('openlayers'),
    proj4                    = require('proj4'),
    addLayers                = require('./addLayers'),
    mousePositionControl     = require('./mousePositionControl'),
    addLayerToLayertool      = require('./addLayerToLayertool'),
    removeLayerFromLayertool = require('./removeLayerFromLayertool'),
    addSelectInteraction     = require('./addSelectInteraction');

module.exports = function () {
    // only build up map if not yet done
    if (!window.oi.olMap.map) {
        var projection,
            RESOLUTIONS,
            map,
            layers;

        projection = ol.proj.get('EPSG:21781');
        // We have to set the extent!
        projection.setExtent([2420000, 130000, 2900000, 1350000]);
        //projection.setExtent([485869.5728, 76443.1884, 837076.5648, 299941.7864]);
        RESOLUTIONS = [
            4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
            1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5, 0.25, 0.1, 0.05
        ];

        map = new ol.Map({
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
            view: new ol.View({
                projection: projection,
                center: [2701719, 1173560],
                zoom: 16,
                resolutions: RESOLUTIONS
            }),
            interactions: ol.interaction.defaults({
                doubleClickZoom: false
            })
        });

        // make map global
        window.oi.olMap.map = map;

        addSelectInteraction();

        // start listening for changes on the layers
        // change layertool
        layers = map.getLayers();
        layers.on('add', function (response) {
            addLayerToLayertool(response.element);
        });
        layers.on('remove', function (response) {
            removeLayerFromLayertool(response.element);
        });

        addLayers();
    }
};