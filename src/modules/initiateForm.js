/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    _                    = require('underscore'),
    PouchDB              = require('pouchdb'),
    db                   = new PouchDB('oi'),
    input                = require('../../templates/input'),
    textarea             = require('../../templates/textarea'),
    fitTextareaToContent = require('./fitTextareaToContent');

module.exports = function (_id) {

    var html         = '',
        $formContent = $('#formContent'),
        textareaIds  = [];

    console.log('_id: ', _id);

    // get data for object
    db.get(_id, function (err, object) {
        if (err) { console.log('error: ', err); }
        // get metainformation about fields
        db.get(object.hId, function (err, hierarchy) {
            if (err) { console.log('error: ', err); }
            _.each(hierarchy.fields, function (field) {
                var templateObject = {};
                templateObject.objectId = object._id;
                templateObject.label = field.label;
                templateObject.type = field.type || null;
                templateObject.value = object.data[field.label] || null;
                switch (field.type) {
                case 'textarea':
                    html += textarea(templateObject);
                    textareaIds.push(object._id + field.label);
                    break;
                // case 'input':
                default:
                    html += input(templateObject);
                    break;
                }
            });

            $formContent.html(html);
            
            _.each(textareaIds, function (textareaId) {
                fitTextareaToContent(textareaId);
            });
        });
    });
};