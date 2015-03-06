/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (trueOrFalse) {
    $('#utilsEditDeleteFeature').prop('disabled', !trueOrFalse);
    $('#utilsEditDeletePoint').prop('disabled', !trueOrFalse);
};