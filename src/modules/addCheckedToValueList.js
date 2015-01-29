/*
 * erstellt aus einer valueArray einen Array von Objekten
 * mit value und checked
 * wird benutzt, um opionGroup und checkboxGroup zu bauen
 * damit es auch für select benutzt werden kann, kann selectedOrChecked übergeben werden 
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (valueArray, fieldValueArray, selectedOrChecked) {

    selectedOrChecked = selectedOrChecked || 'checked';

    return _.map(valueArray, function (value) {
        var valueObject = {};

        if (typeof value === 'object') {
            // valueList enthielt Objekte mit values und labels
            valueObject.value = value.value;
            valueObject.label = value.label;
            // setzen, ob checkbox checked ist
            valueObject.checked = _.indexOf(fieldValueArray, value.value) > -1 ? selectedOrChecked : '';
        } else {
            valueObject.value = valueObject.label = value;
            // setzen, ob checkbox checked ist
            valueObject.checked = _.indexOf(fieldValueArray, value) > -1 ? selectedOrChecked : '';
        }

        return valueObject;
    });
};