/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var openSigninModal = require('./openSigninModal'),
    initiateNav     = require('./initiateNav');

module.exports = function () {
    var loginName = localStorage.loginName;

    if (loginName) {
        window.oi.loginName = loginName;
        initiateNav();
    } else {
        openSigninModal();
    }

};