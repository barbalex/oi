/*
 * holt sich nach einer Änderung in einem Feld die Daten
 * Vorsicht: Holt sich alle Daten als string
 * daher müssen sie in den richtigen Datentyp konvertiert werden
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    _                    = require('underscore'),
    convertToCorrectType = require('./convertToCorrectType');

module.exports = function (that) {
    var value,
        $that = $(that);

    //console.log('changed');
    //console.log('this: ', that);
    //console.log('object: ', $that.data('object'));
    //console.log('_id: ', $that.data('object')._id);
    //console.log('type: ', that.type);
    //console.log('inputDataType: ', $that.data('object').inputDataType);
    //console.log('label: ', $that.data('object').label);
    //console.log('value before: ', $that.data('object').value);

    switch (that.type) {
    case 'text':
    case 'number':
    case 'textarea':
    case 'select-one':
    case 'radio':
        value = convertToCorrectType(that.value);
        break;
    case 'checkbox':
        switch ($that.data('object').inputDataType) {
        case 'checkbox':
            value = $that.is(':checked');
            break;
        case 'checkboxGroup':
            value = [];
            _.each($('[name="' + $that.data('object')._id + $that.data('object').label + '"]:checked'), function (checkbox) {
                value.push(convertToCorrectType(checkbox.value));
            });
            console.log('getValueAfterChange: checkboxGroup: value: ', value);
            break;
        }
        break;
    }
    return value;
};