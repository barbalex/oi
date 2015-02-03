/*jslint node: true, browser: true, nomen: true, todo: true */
/*
 * Vorsicht: wenn mit saveObjectValue ein neuer Wert in die DB geschrieben wird,
 * löst das AUCH einen change aus
 * saveObjectValue passt nach dem put die rev des models an
 * diese function hier läuft aber VORHER!!!
 * Wurde also ein change aus dieser Anwendung ausgelöst, muss verglichen werden,
 * ob das Objekt im Model und das im change gleich sind
 * nur wenn sie ungleich sind, muss model und allenfalls ui aktualisiert werden
 * Beim Vergleich ist die rev zu ignorieren, weil diese ja noch nicht aktualisiert wurde!
 */
'use strict';

var $                 = require('jquery'),
    _                 = require('underscore'),
    initiateForm      = require('./form/initiateForm'),
    getLabelForObject = require('./nav/getLabelForObject');

module.exports = function (change) {
    var modelObject,
        correspondingHierarchy;

    console.log('change: ', change);

    // update model of object
    modelObject = _.find(window.oi.objects, function (object) {
        return object._id === change.id;
    });

    // nur weiterfahren, wenn ein model gefunden wurde und es anders ist
    //if (modelObject && JSON.stringify(modelObject.data) !== JSON.stringify(change.doc.data)) {
    if (modelObject) {

        // replace existing object with new one
        window.oi.objects[window.oi.objects.indexOf(modelObject)] = change.doc;

        // refresh form if this object is shown
        // cant update only changed field because it is unknown (?)
        if ($('#formContent').html() !== "" && $('#formContent').data('id') === change.doc._id) {
            // TODO: hier wird Fehler generiert, wenn ausserhalb App Daten verändert werden
            initiateForm(change.doc._id);
        }
        // refresh tree
        correspondingHierarchy = _.find(window.oi.hierarchies, function (hierarchy) {
            return hierarchy._id === change.doc.hId;
        });
        if (change.doc.data && correspondingHierarchy && correspondingHierarchy.nameField) {
            $('#navContent').jstree().rename_node('#' + change.doc._id, getLabelForObject(change.doc, correspondingHierarchy));
        }
    }
};