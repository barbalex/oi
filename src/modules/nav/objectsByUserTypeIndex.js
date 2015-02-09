/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        _id: '_design/objects_by_type',
        views: {
            'objects_by_type': {
                map: function (doc) {
                    if (doc.type) {
                        if (doc.users && doc.users.length > 0) {
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