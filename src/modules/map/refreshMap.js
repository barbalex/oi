/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    if (window.oi.olMap.map) {
        window.oi.olMap.map.updateSize();
    }
};