/*
 * is passed a layer and a feature id
 * returns the corresponding feature
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers'),
    _  = require('underscore');

module.exports = function (layer, featureId) {
    var source,
        feature;

    source  = layer.getSource();
    feature = source.getFeatureById(featureId);
    return feature;
};