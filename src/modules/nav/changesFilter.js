/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

module.exports = function () {
    return {
        _id: '_design/changes_filter',
        filters: {
            'changes_filter': {
                map: function (doc, req) {
                    var thisType      = false,
                        otherDatabase = true,
                        thisUser      = false;

                    if (doc.type && doc.type === req.type) {
                        thisType = true;
                    }

                    if (doc.lastEdited) {
                        if (doc.lastEdited.database) {
                            if (doc.lastEdited.database === req.databaseId) {
                                otherDatabase = false;
                            }
                        }
                    }

                    if (doc.users && doc.users.length > 0 && doc.type) {
                        if (doc.users.indexOf(req.type) > -1) {
                            thisUser = true;
                        }
                    }

                    if (thisType && otherDatabase && thisUser) {
                        return true;
                    }
                    return false;
                }.toString()
            }
        }
    };
};