/*
 * removes a layer from the layercontrol
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (layer) {
    var showControlId = 'show' + layer.get('layerName'),
        $listGroupDiv,
        i,
        len;

    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    };
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (i = 0, len = this.length; i < len; i++) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    };

    $listGroupDiv = $('#' + showControlId).closest('.list-group');

    $listGroupDiv.remove();
};