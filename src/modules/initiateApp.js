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

    // letzte Konfiguration für die Tabs holen
    if (localStorage.previousTabConfig) {
        window.oi.previousTabConfig = JSON.parse(localStorage.previousTabConfig);
    }

    proj4.defs("EPSG:21781", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs");
};