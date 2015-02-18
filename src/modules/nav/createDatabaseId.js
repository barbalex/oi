/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    if (!localStorage.databaseId) {
        localStorage.databaseId = Math.random();
    }
    window.oi.databaseId = localStorage.databaseId;
};