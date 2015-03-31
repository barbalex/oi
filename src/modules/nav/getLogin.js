/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var openSigninModal             = require('./openSigninModal'),
    getProjectNamesToInitiateUi = require('./getProjectNamesToInitiateUi');

module.exports = function () {
    var loginName = localStorage.me_name,
        newSignup = false;

    if (loginName) {
        window.oi.me          = {};
        window.oi.me.name     = loginName;
        window.oi.me.password = localStorage.me_password;
        getProjectNamesToInitiateUi(null);
    } else {
        openSigninModal();
    }

};