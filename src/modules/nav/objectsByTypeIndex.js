/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

// TODO: get only the users data
module.exports = function () {
    return {
        _id: '_design/objects_by_type',
        views: {
            'objects_by_type': {
                map: function (doc) {
                    if (doc.type) {
                        emit(doc.type);
                    }
                }.toString()
            }
        }
    };
};