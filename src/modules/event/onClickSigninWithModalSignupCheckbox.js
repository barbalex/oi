/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    if ($(this).is(':checked')) {
        $('#signinWithModalPassword2').parent().show();
        $('#signinWithModalSigninButton').text('Konto erstellen und anmelden');
    } else {
        $('#signinWithModalPassword2').parent().hide();
        $('#signinWithModalSigninButton').text('anmelden');
    }
};