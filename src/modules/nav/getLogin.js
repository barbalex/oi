/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var openSigninModal = require('./openSigninModal'),
    initiateNav     = require('./initiateNav');

module.exports = function () {
    var loginName = localStorage.me_name;

    if (loginName) {
        window.oi.me          = {};
        window.oi.me.name     = loginName;
        window.oi.me.password = localStorage.me_password;
        initiateNav();
    } else {
        openSigninModal();
    }

};