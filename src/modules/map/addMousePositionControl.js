/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol    = require('openlayers'),
    proj4 = require('proj4');

module.exports = function () {
    var mousePositionControl,
        projection;

    proj4.defs("EPSG:21781", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");
    projection = ol.proj.get('EPSG:21781');
    // We have to set the extent!
    projection.setExtent([2420000, 130000, 2900000, 1350000]);

    mousePositionControl = new ol.control.MousePosition({
        // This is the format we want the coordinate in
        // The number argument in createStringXY is the number of decimal places
        coordinateFormat: ol.coordinate.createStringXY(0),
        projection: projection,
        //projection: "EPSG:3857",
        //projection: "EPSG:4326",
        undefinedHTML: '&nbsp;' // what openlayers will use if the map returns undefined for a map coordinate
    });
    window.oi.olMap.map.addControl(mousePositionControl);
};