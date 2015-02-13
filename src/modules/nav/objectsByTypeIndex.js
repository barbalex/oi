/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        _id: '_design/objects_by_type',
        views: {
            'objects_by_type': {
                map: function (doc) {
                    if (doc.type) {
                        emit(doc.type, null);
                    }
                }.toString()
            }
        }
    };
};