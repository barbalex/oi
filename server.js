/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var Hapi = require('hapi'),
    options,
    server;

server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: 2000
});

// start the server:
server.start(function (err) {
    if (err) { throw err; }
    console.log('ortinfo is running at: http://localhost:2000');
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
    path: '/oi.appcache',
    handler: function (request, reply) {
        //console.log('serving oi.appcache');
        reply('/oi.appcache')
            .type('text/cache-manifest');
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
    path: '/fonts/glyphicons-halflings-regular.woff',
    handler: function (request, reply) {
        reply('/fonts/glyphicons-halflings-regular.woff')
            .type('application/x-font-woff');
    }
});

server.route({
    method: 'GET',
    path: '/fonts/glyphicons-halflings-regular.woff2',
    handler: function (request, reply) {
        reply('/fonts/glyphicons-halflings-regular.woff2')
            .type('application/x-font-woff');
    }
});

server.route({
    method: 'GET',
    path: '/fonts/glyphicons-halflings-regular.ttf',
    handler: function (request, reply) {
        reply('/fonts/glyphicons-halflings-regular.ttf')
            .type('application/x-font-ttf');
    }
});

server.route({
    method: 'GET',
    path: '/fonts/{param*}',
    handler: {
        directory: {
            path: 'fonts'
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