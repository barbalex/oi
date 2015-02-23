/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (event) {
    if (event.which === 13) {
        $('#signinWithModalSigninButton').trigger('click');
    }
};