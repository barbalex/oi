/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                    = require('jquery'),
    _                    = require('underscore'),
    PouchDB              = require('pouchdb'),
    db                   = new PouchDB('oi'),
    input                = require('../../templates/input'),
    textarea             = require('../../templates/textarea'),
    checkbox             = require('../../templates/checkbox'),
    options              = require('../../templates/options'),
    fitTextareaToContent = require('./fitTextareaToContent');

module.exports = function (_id) {

    var html            = '',
        $formContent    = $('#formContent'),
        textareaIds     = [],
        valueObjectList = [];

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
                case 'input':
                    switch (field.dataType) {
                    case 'checkbox':
                        // setzen, ob checkbox checked ist
                        templateObject.checked = object.data[field.label] ? 'checked' : '';
                        html += checkbox(templateObject);
                        break;
                    //case 'text':
                    default:
                        html += input(templateObject);
                        break;
                    }
                    break;
                case 'options':
                    // convert valueList into an array of objects
                    valueObjectList = _.map(field.valueList, function (value) {
                        var valueObject = {};
                        valueObject.value = value;
                        // setzen, ob checkbox checked ist
                        valueObject.checked = value == object.data[field.label] ? 'checked' : '';
                        return valueObject;

                    });
                    templateObject.divName = object._id + field.label + 'div';
                    templateObject.valueList = valueObjectList;
                    html += options(templateObject);
                    break;
                default:
                    html += input(templateObject);
                    break;
                }
            });

            $formContent.html(html);

            // textareas: Grösse an Wert anpassen
            _.each(textareaIds, function (textareaId) {
                fitTextareaToContent(textareaId);
            });
        });
    });
};