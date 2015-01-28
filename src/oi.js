/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var initiateResizables          = require('./modules/initiateResizables'),
    setupEvents                 = require('./modules/setupEvents'),
    initiateNav                = require('./modules/initiateNav');
    //createGlobals             = require('./modules/createGlobals'),
    //clearLocalStorage         = require('./modules/clearLocalStorage'),
    //waehleApliste             = require('./modules/waehleApliste'),
    //oeffneUri                 = require('./modules/oeffneUri'),
    //setupEvents               = require('./modules/setupEvents');

// benötigte globale Variabeln initialisieren
window.oi       = window.oi       || {};
window.oi.olMap = window.oi.olMap || {};

// initiiereApp als globale Variable bereitstellen,
// damit es wenn nötig später wieder aufgerufen werden kann
// oi.js kann den anderen Modulen nicht als browserify-Modul bereitgestellt werden,
// weil es die Quelle der Modularisierung ist
window.oi.initiiereApp = function () {

    //createGlobals();

    // localStorage ausräumen
    //clearLocalStorage();

    /*$.when(waehleApliste('programmAlle')).then(function () {
        // falls eine Unteradresse angewählt wurde, diese öffnen
        oeffneUri();
    });*/

    // für index.html bereitstellen
    // damit es garantiert nur ein mal ausgeführt wird
    window.oi.setupEvents = function () {
        setupEvents();
    };
    window.oi.setupJqueryUi = function () {
        //setupJqueryUi();
    };

    window.oi.initiateResizables = function () {
        initiateResizables();
    };

    window.oi.initiateNav = function () {
        initiateNav();
    };
};

// gleich ein mal ausführen
window.oi.initiiereApp();