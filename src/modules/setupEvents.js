/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    fitTextareaToContent  = require('./form/fitTextareaToContent'),
    onScrollTab           = require('./event/onScrollTab'),
    onClickFormNew        = require('./event/onClickFormNew'),
    onClickFormDelete     = require('./event/onClickFormDelete'),
    onChangeElement       = require('./event/onChangeElement'),
    onClickNavbarCollapse = require('./event/onClickNavbarCollapse'),
    onClickNavbarBrand    = require('./event/onClickNavbarBrand');

module.exports = function () {
    // scroll event doesn't buble up, so it cant be delegated from # to .
    $('.js-tab')
        .on('scroll',                                 onScrollTab);

    $('#form')
        .on('click',       '#formNew',                onClickFormNew)
        .on('click',       '#formDelete',             onClickFormDelete);

    $('#formContent')
        .on('keyup focus', 'textarea',                fitTextareaToContent)
        .on('change',      'input, textarea, select', onChangeElement);

    $('body')
        .on('click.nav',   '.navbar-collapse.in',     onClickNavbarCollapse)
        .on('click.nav',   '.navbar-brand',           onClickNavbarBrand);
};