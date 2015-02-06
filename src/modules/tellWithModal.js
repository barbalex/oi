/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (title, text) {
    var $modal = $('#tellWithModal'),
        options;

    title = title || '';
    text  = text  || '';

    options = {
        keyboard: true
    };

    $modal.find('.modal-title').html(title);
    $modal.find('.modal-body').find('p').html(text);
    $modal.modal(options);
};