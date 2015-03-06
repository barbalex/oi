/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $                     = require('jquery'),
    _                     = require('underscore'),
    ol                    = require('openlayers'),
    input                 = require('../../../templates/input'),
    textarea              = require('../../../templates/textarea'),
    checkbox              = require('../../../templates/checkbox'),
    optionGroup           = require('../../../templates/optionGroup'),
    checkboxGroup         = require('../../../templates/checkboxGroup'),
    select                = require('../../../templates/select'),
    geoJson               = require('../../../templates/geoJson'),
    formButtonToolbar     = require('../../../templates/formButtonToolbar'),
    addCheckedToValueList = require('./addCheckedToValueList'),
    positionFormBtngroup  = require('./positionFormBtngroup'),
    getObject             = require('../getObject'),
    getHierarchy          = require('../getHierarchy'),
    resizeTextareas       = require('./resizeTextareas'),
    refreshScrollbar      = require('../refreshScrollbar'),
    capitalizeFirstLetter = require('../capitalizeFirstLetter'),
    showTab               = require('../showTab'),
    zoomToFeatures        = require('../map/zoomToFeatures');

module.exports = function (id, type) {
    var html         = '',
        textareaIds  = [],
        object,
        hierarchy,
        $formContent = $('#formContent'),
        geomFeatures,
        geomFeature,
        selectedFeatures;

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
                    var value,
                        templateObject                  = {};

                    value                               = object.data[field.label];
                    templateObject.object               = {};
                    templateObject.object._id           = id;
                    templateObject.object.type          = type;
                    templateObject.object.inputType     = field.inputType;
                    templateObject.object.projId        = object.projId            || null;
                    templateObject.object.label         = field.label;
                    templateObject.object.inputDataType = field.inputDataType      || null;
                    templateObject.object.value         = value;
                    templateObject.object.layerTitle    = hierarchy.name + ': ' + field.label;
                    templateObject.object.layerName     = 'layer' + capitalizeFirstLetter(hierarchy.name) + capitalizeFirstLetter(field.label);

                    geomFeatures = [];

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
                            templateObject.checked = value ? 'checked' : '';
                            html += checkbox(templateObject);
                            break;
                        case 'checkboxGroup':
                            // checkboxGroup erstellen
                            templateObject.object.valueList = addCheckedToValueList(field.valueList, value, 'checkboxGroup');
                            html += checkboxGroup(templateObject);
                            break;
                        case 'optionGroup':
                            templateObject.object.valueList = addCheckedToValueList(field.valueList, value, 'optionGroup');
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
                        templateObject.object.valueList = addCheckedToValueList(field.valueList, value, 'select');
                        html += select(templateObject);
                        break;
                    case 'geoJson':
                        // Daten als JSON in textarea schreiben
                        templateObject.object.value = value ? JSON.stringify(value, null, 4) : '';
                        templateObject.object.hId   = object.hId;
                        html += geoJson(templateObject);
                        textareaIds.push(id + field.label);
                        // prepare feature to zoom the map to
                        if (value.type && value.coordinates) {
                            geomFeature = new ol.Feature();
                            geomFeature.setGeometry(new ol.geom[value.type](value.coordinates));
                            geomFeatures.push(geomFeature);
                        }
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
                resizeTextareas();
                refreshScrollbar();

                // wenn Geometrie existiert, entsprechenden Layer im Layertool öffnen
                if (geomFeatures && geomFeatures.length > 0) {
                    // Karte anzeigen
                    showTab('map');
                    // zu den Geometrien zoomen
                    // wenn ausgelöst duch Klick auf Geometrie auf Karte, soll nicht gezoomt werden
                    if (!window.oi.olMap.dontZoom) {
                        zoomToFeatures(geomFeatures, 200);
                    } else {
                        delete window.oi.olMap.dontZoom;
                    }

                    // sie selectieren
                    selectedFeatures = window.oi.olMap.map.selectInteraction.getFeatures();
                    // bestehende Selektion aufheben
                    selectedFeatures.clear();
                    _.each(geomFeatures, function (geomFeature) {
                        // make sure, selectInteraction doesn't select in tree
                        window.oi.dontSelectTree = true;
                        selectedFeatures.push(geomFeature);
                    });
                    // Layer im Layertool öffnen
                    $('#collapseProject' + object.projId).collapse('show');
                }
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