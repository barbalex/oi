/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                   = require('jquery'),
    getValueAfterChange = require('../form/getValueAfterChange'),
    saveObjectValue     = require('../form/saveObjectValue');

module.exports = function () {
    var value  = getValueAfterChange(this),
        object = $(this).data('object');

    console.log('onChangeElement: value: ', value);
    console.log('onChangeElement: typeof value: ', typeof value);

    saveObjectValue(object, value);
};