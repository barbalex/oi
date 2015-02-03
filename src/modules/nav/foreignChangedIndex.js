/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        _id: '_design/foreign_changed',
        views: {
            'foreign_changed': {
                map: function (doc) {
                    if (doc.lastEdited) {
                        if (doc.lastEdited.database) {
                            if (doc.lastEdited.database !== window.oi.databaseId) {
                                emit(doc.type);
                            }
                        } else {
                            emit(doc.type);
                        }
                    } else {
                        emit(doc.type);
                    }
                }.toString()
            }
        }
    };
}