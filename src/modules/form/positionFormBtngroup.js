/*jslint node: true, browser: true, nomen: true, todo: true, plusplus: true, white: true*/
'use strict';

var $ = require('jquery');

module.exports = function (wert) {
    $('#form').find('.btn-group').css('margin-left', $('#formContent').width() - 120);
};