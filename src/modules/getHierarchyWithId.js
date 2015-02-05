/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (hierarchyId) {
    var hierarchy;

    // get data for object
    hierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
        return hierarchy._id === hierarchyId;
    });

    return hierarchy || null;
};