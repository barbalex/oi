/*
 * erstellt aus einer valueArray einen Array von Objekten
 * mit value und checked
 * wird benutzt, um opionGroup und checkboxGroup zu bauen
 * damit es auch für select benutzt werden kann, kann selectedOrChecked übergeben werden 
 * type ist select, optionGroup oder checkboxgroup
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (valueArray, fieldValueArray, type) {

    var valueList,
        selectedOrChecked = type === 'select' ? 'selected' : 'checked',
        nullObject = {};

    nullObject.value = null;
    nullObject.label = '(kein Wert)';

    // add empty value in selects and optionGroups
    if (type === 'select' || type === 'optionGroup') {
        // Vorsicht: null ist auch ein Objekt!
        if (typeof valueArray[0] === 'object' && valueArray[0] !== null) {
            valueList = _.pluck(valueArray, 'value');
            if (_.indexOf(valueList, null) === -1) {
                valueArray.unshift(nullObject);
            }
        } else {
            if (_.indexOf(valueArray, null) === -1) {
                valueArray.unshift(null);
            }
        }
    }

    return _.map(valueArray, function (value) {
        var valueObject = {};

        // offenbar ist typeof null object!!!
        if (value && typeof value === 'object') {
            // valueList enthielt Objekte mit values und labels
            valueObject.value = value.value;
            valueObject.label = value.label;
            // setzen, ob checkbox checked ist
            valueObject.checked = _.indexOf(fieldValueArray, value.value) > -1 ? selectedOrChecked : '';
        } else {
            valueObject.value = value;
            if ((type === 'select' || type === 'optionGroup') && value === null) {
                valueObject.label = '(kein Wert)';
            } else {
                valueObject.label = value;
            }
            // setzen, ob checkbox checked ist
            valueObject.checked = _.indexOf(fieldValueArray, value) > -1 ? selectedOrChecked : '';
        }
        return valueObject;
    });
};