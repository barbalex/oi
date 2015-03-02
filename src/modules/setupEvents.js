/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                                    = require('jquery'),
    _                                    = require('underscore'),
    fitTextareaToContent                 = require('./form/fitTextareaToContent'),
    onScrollTab                          = require('./event/onScrollTab'),
    onClickFormNew                       = require('./event/onClickFormNew'),
    onClickFormDelete                    = require('./event/onClickFormDelete'),
    onChangeElement                      = require('./event/onChangeElement'),
    onClickNavbarCollapse                = require('./event/onClickNavbarCollapse'),
    onClickNavbarBrand                   = require('./event/onClickNavbarBrand'),
    onClickNavFormSort                   = require('./event/onClickNavFormSort'),
    onKeypressSigninWithModal            = require('./event/onKeypressSigninWithModal'),
    onClickSigninWithModalSignupCheckbox = require('./event/onClickSigninWithModalSignupCheckbox'),
    signInOrUp                           = require('./nav/signInOrUp'),
    onClickGeometryField                 = require('./event/onClickGeometryField'),
    onChangeLytShowLayer                 = require('./event/onChangeLytShowLayer'),
    onChangeLytEditLayer                 = require('./event/onChangeLytEditLayer');

module.exports = function () {
    // scroll event doesn't buble up, so it cant be delegated from # to .
    $('.js-tab')
        .on('scroll',                                        onScrollTab);

    $('body')
        .on('click',       '#signinWithModalSignupCheckbox', onClickSigninWithModalSignupCheckbox)
        .on('click',       '#signinWithModalSigninButton',   signInOrUp)
        .on('click.nav',   '.navbar-collapse.in',            onClickNavbarCollapse)
        .on('click.nav',   '.navbar-brand',                  onClickNavbarBrand);

    $('#signinWithModal')
        .on('keypress',                                      onKeypressSigninWithModal);

    $('.nav')
        .on('click',       '#navFormSort',                   onClickNavFormSort);

    $('#form')
        .on('click',       '#formNew',                       onClickFormNew)
        .on('click',       '#formDelete',                    onClickFormDelete)
        .on('click',       '.js-geometryField',              onClickGeometryField);

    $('#formContent')
        .on('keyup focus', 'textarea',                       fitTextareaToContent)
        .on('change',      'input, textarea, select',        onChangeElement);

    $('#utils')
        .on('change',      '.js-lytShowLayer',               onChangeLytShowLayer)
        .on('change',      '.js-lytEditLayer',               onChangeLytEditLayer);
};