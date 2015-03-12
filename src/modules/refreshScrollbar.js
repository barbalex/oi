/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $  = require('jquery'),
    Ps = require('perfect-scrollbar');

module.exports = function () {
    $('.scrollbar').each(function (index, element) {
        Ps.update(element);
    });
};