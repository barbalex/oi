/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

// TODO: get only the users data
module.exports = function () {
    return {
        _id: '_design/objects',
        views: {
            'objects': {
                map: function (doc) {
                    if (doc.type === 'object') {
                        emit(doc._id);
                    }
                }.toString()
            }
        }
    };
};