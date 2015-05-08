/*jslint node: true, browser: true, nomen: true, todo: true*/
'use strict';

var ol                = require('openlayers'),
    $                 = require('jquery'),
    _                 = require('underscore'),
    toggleEditButtons = require('./toggleEditButtons');

module.exports = function () {
    var map = window.oi.olMap.map;

    if (map.drawInteraction)    { map.removeInteraction(map.drawInteraction); }
    if (map.modifyInteraction)  { map.removeInteraction(map.modifyInteraction); }
    if (map.selectInteraction)  {
        map.removeInteraction(map.selectInteraction);
        $(document).off('keyup');
    }
    if (map.dragBoxInteraction) { map.removeInteraction(map.dragBoxInteraction); }
    // there can be several snap interactions
    // remove all
    if (map.snapInteraction) {
        _.each(map.snapInteraction, function (snpInteraction) {
            map.removeInteraction(snpInteraction);
        });
    }
    toggleEditButtons(false);
};