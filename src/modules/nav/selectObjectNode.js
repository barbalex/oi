/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $ = require('jquery');

module.exports = function (objId) {
    var selectedObj,
        $jstree = $('#navContent').jstree(true);

    selectedObj = $jstree.get_selected(true)[0];
    // dont select if it is already selected
    if (!selectedObj || objId !== selectedObj.id) {
        // make sure only one node is selected
        $jstree.deselect_all();
        $jstree.select_node('#' + objId);
    }
};