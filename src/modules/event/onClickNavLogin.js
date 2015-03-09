/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var openSigninModal = require('../nav/openSigninModal');

module.exports = function () {
    event.preventDefault();
    openSigninModal();
};