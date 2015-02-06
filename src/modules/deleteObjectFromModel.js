/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (objectId) {
    var object = _.find(window.oi.objects, function (object) {
        return object._id === objectId;
    });
    if (object) {
        window.oi.objects = _.without(window.oi.objects, object);
    }
};