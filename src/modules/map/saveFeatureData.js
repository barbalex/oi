/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol              = require('openlayers'),
    $               = require('jquery'),
    _               = require('underscore'),
    saveObjectValue = require('../form/saveObjectValue');

module.exports = function (feature) {
    var format = new ol.format.GeoJSON(),
        // this will be the data in the chosen format
        data,
        map,
        layers,
        layer,
        passingObject,
        objId,
        object;

    map    = window.oi.olMap.map;
    layers = map.getLayers().getArray();
    layer  = _.find(layers, function (layer) {
        return layer.get('editing') === true;
    });

    // convert the data of the layer into GeoJson
    data = JSON.parse(format.writeFeature(feature));

    console.log('saveFeatureData: data: ', data);

    objId = feature.getId();
    object = _.find(window.oi.objects, function (object) {
        return object._id === objId;
    });
    if (object) {
        // create object to pass to saveObjectValue
        passingObject        = {};
        passingObject._id    = objId;
        passingObject.projId = object.projId;
        passingObject.label  = layer.get('fieldLabel');
        // dont pass inputType - it's not necessary to convert the GeoJson to an Object
        passingObject.inputType = 'GeoJson';
        saveObjectValue(passingObject, data.geometry);
        // update field in ui
        $('#' + objId + passingObject.label).val(JSON.stringify(data.geometry));
    }
};