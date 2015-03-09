/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (trueOrFalseForced) {
    var selectInteraction = window.oi.olMap.map.selectInteraction,
        featuresSelected  = false,
        featuresLength,
        deleteButtonText;

    //console.log('toggleEditButtons');

    if (selectInteraction && selectInteraction.getFeatures().getArray()) {
        featuresLength   = selectInteraction.getFeatures().getLength();
        featuresSelected = featuresLength > 0;
        deleteButtonText = featuresLength === 1 ? featuresLength + ' Geometrie löschen' : featuresLength + ' Geometrien löschen';
        $('#utilsEditDeleteFeature').text(deleteButtonText);

        console.log('featuresLength: ', featuresLength);

    }
    $('#utilsEditDeleteFeature').prop('disabled', trueOrFalseForced || !featuresSelected);
    $('#utilsEditDeletePoint').prop('disabled',   trueOrFalseForced || !featuresSelected);
};