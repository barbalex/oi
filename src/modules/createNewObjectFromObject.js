/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var getObject       = require('./getObject'),
    getHierarchy    = require('./getHierarchy'),
    createNewObject = require('./createNewObject');

module.exports = function (objectId) {
    var object,
        hierarchy,
        newObject;

    object = getObject(objectId);
    if (object && object.hId) {
        // get metadata for doc
        hierarchy = getHierarchy(object.hId);
        // erstellt neues Objekt, ergänzt model und tree und selected node
        newObject = createNewObject(object, hierarchy);
        if (!newObject) {
            console.log('error: new object not created');
        }
    } else {
        console.log('error: no hierarchy found for object with id = ', objectId);
    }
};