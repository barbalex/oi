/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function () {
    if (event.which === 13) {
        $('#signinWithModalSigninButton').trigger('click');
    }
};