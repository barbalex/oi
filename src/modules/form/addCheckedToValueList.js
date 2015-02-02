/*
 * erstellt aus einer possibleValues einen Array von Objekten
 * mit value und checked
 * wird benutzt, um opionGroup und checkboxGroup zu bauen
 * damit es auch für select benutzt werden kann, kann selectedOrChecked übergeben werden 
 * type ist select, optionGroup oder checkboxgroup
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (possibleValues, setValues, type) {

    var valueList = [],
        selectedOrChecked = type === 'select' ? 'selected' : 'checked',
        nullObject = {};

    nullObject.value = null;
    nullObject.label = '(kein Wert)';

    if (typeof possibleValues[0] === 'object' && possibleValues[0] !== null) {
        valueList = _.pluck(possibleValues, 'value');
    }

    // add empty value in selects and optionGroups
    if (type === 'select' || type === 'optionGroup') {
        // Vorsicht: null ist auch ein Objekt!
        if (typeof possibleValues[0] === 'object' && possibleValues[0] !== null) {
            if (_.indexOf(valueList, null) === -1) {
                possibleValues.unshift(nullObject);
                valueList.unshift(null);
            }
        } else {
            if (_.indexOf(possibleValues, null) === -1) {
                possibleValues.unshift(null);
            }
        }
    }

    //console.log('valueList: ', valueList);
    //console.log('possibleValues: ', possibleValues);
    //console.log('setValues: ', setValues);

    return _.map(possibleValues, function (value) {
        var valueObject = {};

        // offenbar ist typeof null object!!!
        if (value && typeof value === 'object') {
            // valueList enthielt Objekte mit values und labels
            valueObject.value = value.value;
            valueObject.label = value.label;

            //console.log('value.value: ', value.value);
            //console.log('value.label: ', value.label);

            // setzen, ob checkbox checked ist
            if (setValues && setValues.constructor === Array) {
                valueObject.checked = _.indexOf(setValues, value.value) > -1 ? selectedOrChecked : '';
            } else {
                valueObject.checked = setValues == value.value ? selectedOrChecked : '';
            }

            //console.log('valueObject.checked: ', valueObject.checked);

        } else {
            valueObject.value = value;
            if ((type === 'select' || type === 'optionGroup') && value === null) {
                valueObject.label = '(kein Wert)';
            } else {
                valueObject.label = value;
            }
            // setzen, ob checkbox checked ist
            if (setValues && setValues.constructor === Array) {
                valueObject.checked = _.indexOf(setValues, value) > -1 ? selectedOrChecked : '';
            } else {
                valueObject.checked = setValues == value ? selectedOrChecked : '';
            }
        }
        return valueObject;
    });
};