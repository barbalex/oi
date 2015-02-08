/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    fitTextareaToContent  = require('./form/fitTextareaToContent'),
    onScrollTab           = require('./event/onScrollTab'),
    onClickFormNew        = require('./event/onClickFormNew'),
    onClickFormDelete     = require('./event/onClickFormDelete'),
    onChangeElement       = require('./event/onChangeElement'),
    onClickNavbarCollapse = require('./event/onClickNavbarCollapse'),
    onClickNavbarBrand    = require('./event/onClickNavbarBrand'),
    signInOrUp            = require('./nav/signInOrUp');

module.exports = function () {
    // scroll event doesn't buble up, so it cant be delegated from # to .
    $('.js-tab')
        .on('scroll',                                      onScrollTab);

    $('body')
        .on('click', '#signinWithModalSignupCheckbox', function () {
            if ($(this).is(':checked')) {
                $('#signinWithModalPassword2').parent().show();
                $('#signinWithModalSigninButton').text('Konto erstellen und anmelden');
            } else {
                $('#signinWithModalPassword2').parent().hide();
                $('#signinWithModalSigninButton').text('anmelden');
            }
        })
        .on('click',       '#signinWithModalSigninButton', signInOrUp);

    $('#signinWithModal').on('keypress', function (event) {
        if (event.which === 13) {
            $('#signinWithModalSigninButton').trigger('click');
        }
    });

    $('#form')
        .on('click',       '#formNew',                     onClickFormNew)
        .on('click',       '#formDelete',                  onClickFormDelete);

    $('#formContent')
        .on('keyup focus', 'textarea',                     fitTextareaToContent)
        .on('change',      'input, textarea, select',      onChangeElement);

    $('body')
        .on('click.nav',   '.navbar-collapse.in',          onClickNavbarCollapse)
        .on('click.nav',   '.navbar-brand',                onClickNavbarBrand);
};