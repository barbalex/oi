/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    _                     = require('underscore'),
    input                 = require('../../../templates/input'),
    textarea              = require('../../../templates/textarea'),
    checkbox              = require('../../../templates/checkbox'),
    optionGroup           = require('../../../templates/optionGroup'),
    checkboxGroup         = require('../../../templates/checkboxGroup'),
    select                = require('../../../templates/select'),
    geoJson               = require('../../../templates/geoJson'),
    formButtonToolbar     = require('../../../templates/formButtonToolbar'),
    fitTextareaToContent  = require('./fitTextareaToContent'),
    addCheckedToValueList = require('./addCheckedToValueList'),
    positionFormBtngroup  = require('./positionFormBtngroup'),
    getObject             = require('../getObject'),
    getHierarchy          = require('../getHierarchy');

module.exports = function (id, type) {
    var html         = '',
        textareaIds  = [],
        object,
        hierarchy,
        $formContent = $('#formContent');

    switch (type) {
    case 'object':
        // get data for object
        object = getObject(id);

        if (object && object.hId) {
            hierarchy = getHierarchy(object.hId);
            if (hierarchy && hierarchy.fields) {
                // sort fields by order
                hierarchy.fields = _.sortBy(hierarchy.fields, function (field) {
                    return field.order || 0;
                });
                _.each(hierarchy.fields, function (field) {
                    var templateObject                  = {};
                    templateObject.object               = {};
                    templateObject.object._id           = id;
                    templateObject.object.type          = type;
                    templateObject.object.projId        = object.projId            || null;
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
                    case 'geoJson':
                        // Daten als JSON in textarea schreiben
                        templateObject.object.value = JSON.stringify(object.data[field.label]);
                        html += geoJson(templateObject);
                        textareaIds.push(id + field.label);
                        break;
                    default:
                        html += input(templateObject);
                        break;
                    }
                });

                // add button toolbar
                html += formButtonToolbar();

                $formContent.html(html);

                positionFormBtngroup();

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
        $formContent.html(html);
        positionFormBtngroup();
        break;
    }
};