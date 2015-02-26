/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol                      = require('openlayers'),
    createLayers            = require('./createLayers'),
    addMousePositionControl = require('./addMousePositionControl');

module.exports = function () {
    // only build up map if not yet done

    //center: [684297, 237600],
    //center: [902568.5270415349, 5969980.338127118],
    if (!window.oi.olMap.map) {
        // By default OpenLayers does not know about the EPSG:21781 (Swiss) projection.
        // So we create a projection instance for EPSG:21781 and pass it to
        // ol.proj.addProjection to make it available to the library.

        var projection = new ol.proj.Projection({
            code: 'EPSG:21781',
            // The extent is used to determine zoom level 0. Recommended values for a
            // projection's validity extent can be found at http://epsg.io/.
            //extent: [485869.5728, 76443.1884, 837076.5648, 299941.7864],
            extent: [420000, 30000, 900000, 350000],
            units: 'm'
        });
        ol.proj.addProjection(projection);

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
                projection: 'EPSG:3857',
                maxZoom: 17,
                center: [902568.5270415349, 5969980.338127118],
                zoom: 15,
                minZoom: 2
            })
        });
        addMousePositionControl();
    }
};