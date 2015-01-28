/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var $       = require('jquery'),
    _       = require('underscore'),
    PouchDB = require('pouchdb'),
    db      = new PouchDB('oi');

module.exports = function (_id) {
    console.log('_id: ', _id);
    db.get(_id, function (err, body) {
        if (err) { console.log('error: ', err); }
        //console.log('body: ', body);
        $('#formContent').html(JSON.stringify(body));
        console.log('body.hId: ', body.hId);
        // get metainformation about fields
        db.get(body.hId, function (err, body) {
            if (err) { console.log('error: ', err); }
            console.log('body: ', body);
        });
    });
};