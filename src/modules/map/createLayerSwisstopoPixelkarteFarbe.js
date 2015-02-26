/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var ol = require('openlayers');

function qualifyURL(url) {
    var a = document.createElement('a'),
        returnValue;

    a.href = url;
    returnValue = a.cloneNode(false).href;
    // auf localhost korrigieren
    if (returnValue === 'http://localhost:2000/') {
        //returnValue = 'http://api3.geo.admin.ch/';
        //returnValue = 'http://wmts1.geo.admin.ch/';
        returnValue = 'http://wmts10.geo.admin.ch/';
    }
    return returnValue;
}

module.exports = function (timestamp) {
    //url: qualifyURL('..') + '1.0.0/ch.swisstopo.pixelkarte-farbe/default/' + timestamp + '/4326/{z}/{x}/{y}.jpeg'
    //url: qualifyURL('..') + '1.0.0/ch.swisstopo.pixelkarte-farbe/default/' + timestamp + '/21781/{z}/{x}/{y}.jpeg'
    //url: qualifyURL('..') + '1.0.0/ch.swisstopo.pixelkarte-farbe/default/' + timestamp + '/3857/{z}/{x}/{y}.jpeg'
    return new ol.layer.Tile({
        source: new ol.source.OSM({
            attributions: [
                new ol.Attribution({
                    html: '<a target="new" href="http://www.swisstopo.admin.ch/' +
                        'internet/swisstopo/en/home.html">swisstopo</a>'
                })
            ],
            url: qualifyURL('..') + '1.0.0/ch.swisstopo.pixelkarte-farbe/default/' + timestamp + '/3857/{z}/{x}/{y}.jpeg'
        })
    });
};