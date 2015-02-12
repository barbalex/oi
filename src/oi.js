/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var Handlebars                  = require('handlebars'),
    initiateResizables          = require('./modules/initiateResizables'),
    setupEvents                 = require('./modules/setupEvents'),
    getLogin                    = require('./modules/nav/getLogin');

require('bootstrap-validator');

// benötigte globale Variabeln initialisieren
window.oi       = window.oi       || {};
window.oi.olMap = window.oi.olMap || {};

// initiiereApp als globale Variable bereitstellen,
// damit es wenn nötig später wieder aufgerufen werden kann
// oi.js kann den anderen Modulen nicht als browserify-Modul bereitgestellt werden,
// weil es die Quelle der Modularisierung ist
window.oi.initiiereApp = function () {

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

// gleich ein mal ausführen
window.oi.initiiereApp();