/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        _id: '_design/foreign_changed',
        views: {
            'foreign_changed': {
                map: function (doc) {
                    var doEmit = false;
                    if (doc.lastEdited) {
                        if (doc.lastEdited.database) {
                            emit([doc.type], null);
                        } else {
                            emit([doc.type], null);
                        }
                    } else {
                        emit([doc.type], null);
                    }
                }.toString()
            }
        }
    };
};