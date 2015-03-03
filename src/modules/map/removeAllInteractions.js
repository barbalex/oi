/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers'),
    $  = require('jquery');

module.exports = function () {
    var map = window.oi.olMap.map;

    if (map.drawInteraction)   { map.removeInteraction(map.drawInteraction); }
    //map.drawInteraction.off('drawend');
    if (map.modifyInteraction) { map.removeInteraction(map.modifyInteraction); }
    //$(document).off('keyup');
    if (map.selectInteraction) {
        map.removeInteraction(map.selectInteraction);
        // remove listener
        $(document).off('keyup');
    }
};