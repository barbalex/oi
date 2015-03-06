/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (trueOrFalseForced) {
    var featuresSelected = false;
    if (window.oi.olMap.map.selectInteraction && window.oi.olMap.map.selectInteraction.getFeatures().getArray()) {
        featuresSelected = window.oi.olMap.map.selectInteraction.getFeatures().getArray().length > 0;
    }
    $('#utilsEditDeleteFeature').prop('disabled', trueOrFalseForced || !featuresSelected);
    $('#utilsEditDeletePoint').prop('disabled', trueOrFalseForced || !featuresSelected);
};