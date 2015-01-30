/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $              = require('jquery'),
    _              = require('underscore'),
    bindModelInput = require('./bindModelInput');

module.exports = function (object) {
    // für alle objekte: two way binding zwischen model und view schaffen
    if (object.data) {
        _.each(object.data, function (value, key) {
            bindModelInput(object, key);
        });
    }
};