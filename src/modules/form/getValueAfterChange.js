/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (that) {
    var value,
        $that = $(that);

    /*console.log('changed');
    console.log('this: ', that);
    console.log('object: ', $that.data('object'));
    console.log('_id: ', $that.data('object')._id);
    console.log('type: ', that.type);
    console.log('dataType: ', $that.data('object').dataType);
    console.log('label: ', $that.data('object').label);
    console.log('value before: ', $that.data('object').value);*/

    switch (that.type) {
    case 'text':
    case 'textarea':
    case 'select-one':
    case 'radio':
        value = that.value;
        break;
    case 'checkbox':
        switch ($that.data('object').dataType) {
        case 'checkbox':
            value = $that.is(':checked');
            break;
        case 'checkboxGroup':
            value = [];
            _.each($('[name="' + $that.data('object')._id + $that.data('object').label + '"]:checked'), function (checkbox) {
                value.push(checkbox.value);
            });
            break;
        }
        break;
    }
    return value;
};