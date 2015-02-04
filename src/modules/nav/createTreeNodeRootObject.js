/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                    = require('underscore'),
    createTreeNodeObject = require('./createTreeNodeObject');

module.exports = function (object) {
    var jstreeObject;

    jstreeObject        = createTreeNodeObject(object);
    jstreeObject.parent = '#';
    return jstreeObject;
};