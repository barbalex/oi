/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _ = require('underscore');

module.exports = function (object, correspondingHierarchy) {
    var objectFromValueList,
        fieldMetadata,
        label;

    // suche nach den Metadaten des Felds
    fieldMetadata = _.find(correspondingHierarchy.fields, function (field) {
        return field.label === correspondingHierarchy.nameField;
    });
    if (fieldMetadata && fieldMetadata.valueList && typeof fieldMetadata.valueList[0] === 'object' && fieldMetadata.valueList[0] !== null) {
        // die Daten dieses Felds haben labels
        // tree mit label beschriften
        objectFromValueList = _.find(fieldMetadata.valueList, function (valueObject) {
            return valueObject.value === object.data[correspondingHierarchy.nameField];
        });
        objectFromValueList = objectFromValueList || {"label": "(kein Wert)"};
        label = '<strong>' + objectFromValueList.label + '</strong>';
    } else {
        label = '<strong>' + object.data[correspondingHierarchy.nameField] + '</strong>';
    }
    return label;
};