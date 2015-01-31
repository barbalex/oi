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
    fitTextareaToContent    = require('./fitTextareaToContent'),
    addCheckedToValueList   = require('./addCheckedToValueList'),
    bindModelInputForObject = require('../bindModelInputForObject');

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
                    templateObject.valueList = addCheckedToValueList(field.valueList, object.data[field.label], 'checkboxGroup');
                    html += checkboxGroup(templateObject);
                    break;
                case 'optionGroup':
                    // object.data muss Array sein - ist bei optionsgroup nicht so, weil eh nur ein Wert gesetzt werden kann > Wert in Array setzen
                    templateObject.valueList = addCheckedToValueList(field.valueList, [object.data[field.label]], 'optionGroup');
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
                templateObject.valueList = addCheckedToValueList(field.valueList, [object.data[field.label]], 'select');
                html += select(templateObject);
                break;
            default:
                html += input(templateObject);
                break;
            }
        });

        $('#formContent').html(html);

        bindModelInputForObject(object);

        // problem: 
        // instead of binding view to Model:
        // - always get data from pouch
        // - insert templates into page
        // - add change-event for data-hook "speichern"
        // - remove change-events for previous inputs

        // objekt als geladen markieren
        $('#formContent').data('id', object._id);

        // textareas: Grösse an Wert anpassen
        _.each(textareaIds, function (textareaId) {
            fitTextareaToContent(textareaId);
        });
    } else {
        console.log('error: found no object with id ', _id);
    }
};