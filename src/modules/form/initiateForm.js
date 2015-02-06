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
    formButtonToolbar     = require('../../../templates/formButtonToolbar'),
    fitTextareaToContent  = require('./fitTextareaToContent'),
    addCheckedToValueList = require('./addCheckedToValueList'),
    positionFormBtngroup  = require('./positionFormBtngroup'),
    getObjectWithId       = require('../getObjectWithId'),
    getHierarchyWithId    = require('../getHierarchyWithId');

module.exports = function (id, type) {
    var html        = '',
        textareaIds = [],
        object,
        hierarchy;

    switch (type) {
    case 'object':
        // get data for object
        object = getObjectWithId(id);

        if (object && object.hId) {
            hierarchy = getHierarchyWithId(object.hId);
            if (hierarchy && hierarchy.fields) {
                _.each(hierarchy.fields, function (field) {
                    var templateObject                  = {};

                    templateObject.object               = {};
                    templateObject.object._id           = id;
                    templateObject.object.type          = type;
                    templateObject.object.label         = field.label;
                    templateObject.object.inputDataType = field.inputDataType      || null;
                    templateObject.object.value         = object.data[field.label] || null;

                    // Felder bauen
                    switch (field.inputType) {
                    case 'textarea':
                        html += textarea(templateObject);
                        textareaIds.push(id + field.label);
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

                positionFormBtngroup();

                // objekt als geladen markieren
                $('#formContent').data('type', type);
                $('#formContent').data('id', id);

                // textareas: Grösse an Wert anpassen
                _.each(textareaIds, function (textareaId) {
                    fitTextareaToContent(textareaId);
                });

                // scrollbars aktualisieren
                $('.scrollbar').perfectScrollbar('update');
            } else {
                console.log('error: found hierarchy for object with id ', id);
            }
        } else {
            console.log('error: found no object with id ', id);
        }
        break;
    case 'hierarchy':
        html += formButtonToolbar();
        $('#formContent').html(html);
        positionFormBtngroup();
        $('#formContent').data('type', type);
        $('#formContent').data('id', id);
        break;
    }
};