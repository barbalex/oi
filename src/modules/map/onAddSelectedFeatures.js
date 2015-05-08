/*jslint node: true, browser: true, nomen: true, todo: true, plusplus */
'use strict';

var $                      = require('jquery'),
    saveFeatureData        = require('./saveFeatureData'),
    toggleEditButtons      = require('./toggleEditButtons'),
    selectObjectNode       = require('../nav/selectObjectNode'),
    deleteSelectedFeatures = require('./deleteSelectedFeatures'),
    styleSelected          = require('./styleSelected');

module.exports = function (event) {
    var feature,
        objId,
        selectedObj;

    console.log('feature added to select interaction');

    toggleEditButtons();

    // grab the feature
    feature = event.element;
    // dieses Objekt in tree und Formular anzeigen
    objId = feature.getId();
    selectObjectNode(objId);

    // set different style
    feature.setStyle(styleSelected());

    // problem: change happens for every pixel that a point is dragged!
    // need to call it only on dragend. But there is no such event
    // counts how often .on('change') happened
    window.oi.eventCounter = 0;
    // ...listen for changes and save them
    feature.on('change', function () {
        var counter,
            that = this;

        window.oi.eventCounter++;
        // registers how often .on('change') happened before end of timeout
        counter = window.oi.eventCounter;
        setTimeout(function () {
            if (counter === window.oi.eventCounter) {
                // during the timeout no further change happened > do it!
                saveFeatureData(that);
            }
        }, 200);
    });
    // listen to pressing of delete key, then delete selected features
    $(document).on('keyup', function (event) {
        if (event.keyCode === 46) {
            // remove all selected features from selectInteraction and layer
            deleteSelectedFeatures();
            // remove listener
            $(document).off('keyup');
        }
    });
};