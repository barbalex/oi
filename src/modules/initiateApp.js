/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var Handlebars         = require('handlebars'),
    initiateResizables = require('./initiateResizables'),
    setupEvents        = require('./setupEvents'),
    getLogin           = require('./nav/getLogin');

module.exports = function () {
    // für index.html bereitstellen
    // damit es garantiert nur ein mal ausgeführt wird
    window.oi.setupEvents = function () {
        setupEvents();
    };

    window.oi.initiateResizables = function () {
        initiateResizables();
    };

    window.oi.getLogin = function () {
        getLogin();
    };

    window.Handlebars = Handlebars;
    window.Handlebars.registerHelper('json', function (context) {
        return JSON.stringify(context);
    });
};