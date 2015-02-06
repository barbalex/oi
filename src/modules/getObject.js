/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (id) {
    var object;

    // get data for object
    object = _.find(window.oi.objects, function (object) {
        return object._id === id;
    });

    return object || null;
};