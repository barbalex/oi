/*
 * hier können Optionen für die pouch gesetzt werden,
 * so, dass sie nur an einem Ort erfasst sind
 * ajax.cache scheint nicht zu wirken!
 * es müsste die Anwendung im IE zum Laufen bringen
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        'ajax': {'cache': false}
    };
};