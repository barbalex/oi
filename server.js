'use strict';

var Hapi            = require('hapi'),
    fakeApi         = require('./fakeApi'),
    server          = new Hapi.Server(
        '0.0.0.0',
        4000,
        {
            debug: {
                request: ['error']
            }
        }
    );

server.pack.register(fakeApi, function (err) {
    if (err) { throw err; }
    // If everything loaded correctly, start the server:
    server.start(function (err) {
        if (err) { throw err; }
        console.log('ortinfo is running at: http://localhost:4000 Yep. That\'s pretty awesome.');
    });
});

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {
        reply.file('index.html');
    }
});
