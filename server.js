/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var Hapi            = require('hapi'),
    server          = new Hapi.Server(
        '0.0.0.0',
        2000,
        {
            debug: {
                request: ['error']
            }
        }
    );

// start the server:
server.start(function (err) {
    if (err) { throw err; }
    console.log('ortinfo is running at: http://localhost:2000. Yep. That\'s pretty awesome.');
});

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {
        reply.file('index.html');
    }
});

server.route({
    method: 'GET',
    path: '/src/{param*}',
    handler: {
        directory: {
            path: 'src'
        }
    }
});

server.route({
    method: 'GET',
    path: '/images/{param*}',
    handler: {
        directory: {
            path: 'images'
        }
    }
});

server.route({
    method: 'GET',
    path: '/style/{param*}',
    handler: {
        directory: {
            path: 'style'
        }
    }
});

server.route({
    method: 'GET',
    path: '/api/objects/{id}',
    handler: function (request, reply) {
        reply(objects);
    }
});

server.route({
    method: 'GET',
    path: '/api/hierarchies',
    handler: function (request, reply) {
        reply(hierarchiesTest);
    }
});