/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    _                    = require('underscore'),
    fitTextareaToContent = require('./fitTextareaToContent');

module.exports = function () {
    $('#formContent').find('textarea').each(function () {
        fitTextareaToContent(this);
    });
};