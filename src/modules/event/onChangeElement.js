/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                   = require('jquery'),
    getValueAfterChange = require('../form/getValueAfterChange'),
    saveObjectValue     = require('../form/saveObjectValue');

module.exports = function () {
    var value = getValueAfterChange(this),
        $that = $(this),
        id    = $that.data('object').id,
        field = $that.data('object').label;

    saveObjectValue(id, field, value);
};