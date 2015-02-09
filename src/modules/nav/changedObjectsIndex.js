/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        _id: '_design/objects_changed',
        views: {
            'objects_changed': {
                map: function (doc) {
                    if (doc.type === 'object') {
                        emit(doc.type, null);
                    }
                }.toString()
            }
        }
    };
};