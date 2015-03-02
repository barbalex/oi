/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers');

module.exports = function () {
    var map = window.oi.olMap.map;

    if (map.drawInteraction)   { map.removeInteraction(map.drawInteraction); }
    if (map.modifyInteraction) { map.removeInteraction(map.modifyInteraction); }
    if (map.selectInteraction) { map.removeInteraction(map.selectInteraction); }
};