/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                  = require('jquery'),
    createLayerForData = require('../map/createLayerForData'),
    toggleTab          = require('../toggleTab'),
    setWidthOfTabs     = require('../setWidthOfTabs');

module.exports = function () {
    var object = $(this).prev().data('object'),
        show   = true;

    // open map
    toggleTab('map', show);
    setWidthOfTabs();
    // load vector layer
    createLayerForData(object);
};