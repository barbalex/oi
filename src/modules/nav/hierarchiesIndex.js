/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

// TODO: get only the users data
module.exports = function () {
    return {
    _id: '_design/hierarchies',
    views: {
            'hierarchies': {
                map: function (doc) {
                    if (doc.type === 'hierarchy') {
                        emit(doc._id);
                    }
                }.toString()
            }
        }
    };
};