/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                       = require('jquery'),
    _                       = require('underscore'),
    PouchDB                 = require('pouchdb'),
    db                      = new PouchDB('oi'),
    input                   = require('../../../templates/input'),
    textarea                = require('../../../templates/textarea'),
    checkbox                = require('../../../templates/checkbox'),
    optionGroup             = require('../../../templates/optionGroup'),
    checkboxGroup           = require('../../../templates/checkboxGroup'),
    select                  = require('../../../templates/select'),
    formButtonToolbar       = require('../../../templates/formButtonToolbar'),
    fitTextareaToContent    = require('./fitTextareaToContent'),
    addCheckedToValueList   = require('./addCheckedToValueList');

module.exports = function (_id) {
    var html        = '',
        textareaIds = [],
        object,
        hierarchy;

    // get data for object
    object = _.find(window.oi.objects, function (object) {
        return object._id === _id;
    });

    if (object && object.hId) {
        hierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
            return hierarchy._id === object.hId;
        });

        if (hierarchy && hierarchy.fields) {
            _.each(hierarchy.fields, function (field) {
                var templateObject      = {};

                templateObject.object          = {};
                templateObject.object._id      = object._id;
                templateObject.object.type     = object.type;
                templateObject.object.label    = field.label;
                templateObject.object.inputDataType = field.inputDataType || null;
                templateObject.object.value    = object.data[field.label] || null;

                // Felder bauen
                switch (field.inputType) {
                case 'textarea':
                    html += textarea(templateObject);
                    textareaIds.push(object._id + field.label);
                    break;
                case 'input':
                    switch (field.inputDataType) {
                    case 'checkbox':
                        // es ist eine einzelne checkbox. Mitgeben, ob sie checked ist
                        templateObject.checked = object.data[field.label] ? 'checked' : '';
                        html += checkbox(templateObject);
                        break;
                    case 'checkboxGroup':
                        // checkboxGroup erstellen
                        templateObject.object.valueList = addCheckedToValueList(field.valueList, object.data[field.label], 'checkboxGroup');
                        html += checkboxGroup(templateObject);
                        break;
                    case 'optionGroup':
                        templateObject.object.valueList = addCheckedToValueList(field.valueList, object.data[field.label], 'optionGroup');
                        html += optionGroup(templateObject);
                        break;
                    case 'text':
                    default:
                        html += input(templateObject);
                        break;
                    }
                    break;
                case 'select':
                    // object.data muss Array sein - ist bei select nicht so, weil eh nur ein Wert gesetzt werden kann > Wert in Array setzen
                    templateObject.object.valueList = addCheckedToValueList(field.valueList, object.data[field.label], 'select');
                    html += select(templateObject);
                    break;
                default:
                    html += input(templateObject);
                    break;
                }
            });

            // add button toolbar
            html += formButtonToolbar();

            $('#formContent').html(html);

            // objekt als geladen markieren
            $('#formContent').data('id', object._id);

            // textareas: Grösse an Wert anpassen
            _.each(textareaIds, function (textareaId) {
                fitTextareaToContent(textareaId);
            });

            // scrollbars aktualisieren
            $('.scrollbar').perfectScrollbar('update');
        } else {
            console.log('error: found hierarchy for object with id ', _id);
        }
    } else {
        console.log('error: found no object with id ', _id);
    }
};