/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    _                     = require('underscore'),
    PouchDB               = require('pouchdb'),
    db                    = new PouchDB('oi'),
    input                 = require('../../../templates/input'),
    textarea              = require('../../../templates/textarea'),
    checkbox              = require('../../../templates/checkbox'),
    optionGroup           = require('../../../templates/optionGroup'),
    checkboxGroup         = require('../../../templates/checkboxGroup'),
    select                = require('../../../templates/select'),
    fitTextareaToContent  = require('./fitTextareaToContent'),
    addCheckedToValueList = require('./addCheckedToValueList');

module.exports = function (_id) {
    var html        = '',
        textareaIds = [];

    // get data for object
    db.get(_id, function (err, object) {
        if (err) { console.log('error: ', err); }
        // get metainformation about fields
        db.get(object.hId, function (err, hierarchy) {
            if (err) { console.log('error: ', err); }
            _.each(hierarchy.fields, function (field) {
                var templateObject      = {};

                templateObject.objectId = object._id;
                templateObject.label    = field.label;
                templateObject.type     = field.type || null;
                templateObject.value    = object.data[field.label] || null;

                // Felder bauen
                switch (field.type) {
                case 'textarea':
                    html += textarea(templateObject);
                    textareaIds.push(object._id + field.label);
                    break;
                case 'input':
                    switch (field.dataType) {
                    case 'checkbox':
                        // es ist eine einzelne checkbox. Mitgeben, ob sie checked ist
                        templateObject.checked = object.data[field.label] ? 'checked' : '';
                        html += checkbox(templateObject);
                        break;
                    case 'checkboxGroup':
                        // checkboxGroup erstellen
                        templateObject.valueList = addCheckedToValueList(field.valueList, object.data[field.label]);
                        html += checkboxGroup(templateObject);
                        break;
                    case 'optionGroup':
                        // object.data muss Array sein - ist bei optionsgrup nicht so, weil eh nur ein Wert gesetzt werden kann > Wert in Array setzen
                        templateObject.valueList = addCheckedToValueList(field.valueList, [object.data[field.label]]);
                        html += optionGroup(templateObject);
                        break;
                    case 'text':
                    default:
                        html += input(templateObject);
                        break;
                    }
                    break;
                case 'select':
                    // object.data muss Array sein - ist bei optionsgrup nicht so, weil eh nur ein Wert gesetzt werden kann > Wert in Array setzen
                    templateObject.valueList = addCheckedToValueList(field.valueList, object.data[field.label], 'selected');
                    html += select(templateObject);
                    break;
                default:
                    html += input(templateObject);
                    break;
                }
            });

            $('#formContent').html(html);

            // textareas: Grösse an Wert anpassen
            _.each(textareaIds, function (textareaId) {
                fitTextareaToContent(textareaId);
            });
        });
    });
};