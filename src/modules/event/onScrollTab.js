/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    var $separator = $(this).find('.js-separator').first(),
        $content   = $(this).find('.js-content').first();

    $separator.css('height', $content.height() + 40);
};