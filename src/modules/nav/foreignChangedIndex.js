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
                            if (doc.lastEdited.database !== window.oi.databaseId) {
                                doEmit = true;
                            }
                        } else {
                            doEmit = true;
                        }
                    } else {
                        doEmit = true;
                    }
                    if (doEmit) {
                        if (doc.users && doc.users.length > 0 && doc.type) {
                            doc.users.forEach(function (user) {
                                emit([user, doc.type], null);
                            });
                        }
                    }
                }.toString()
            }
        }
    };
};