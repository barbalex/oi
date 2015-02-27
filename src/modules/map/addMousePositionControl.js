/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers');

module.exports = function () {
    var mousePositionControl = new ol.control.MousePosition({
        // This is the format we want the coordinate in
        // The number argument in createStringXY is the number of decimal places
        coordinateFormat: ol.coordinate.createStringXY(0),
        //projection: "EPSG:21781",
        projection: "EPSG:3857",
        //projection: "EPSG:4326",
        undefinedHTML: '&nbsp;' // what openlayers will use if the map returns undefined for a map coordinate
    });
    window.oi.olMap.map.addControl(mousePositionControl);
};