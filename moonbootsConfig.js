/*jslint node: true, browser: true, nomen: true, todo: true */
/*global app, me, $*/
'use strict';

var config      = require('getconfig'),
    stylizer    = require('stylizer'),
    templatizer = require('templatizer'),
    // for reuse
    appDir = __dirname + '/client',
    cssDir = __dirname + '/public/css',
    libDir = __dirname + '/lib';


module.exports = {
    // Tell the Hapi server what URLs the application should be served from.
    // Since we're doing clientside routing we want to serve this from some type
    // of wildcard url.
    // examples:
    //     '/{p*}' - match everything that isn't matched by something more specific
    //     '/dashboard/{p*}' - serve the app at all routes starting with '/dashboard'
    appPath: '/{p*}',
    // The moonboots config
    moonboots: {
        // The base name of the javascript file served in the <script src="the_name.*.js">
        jsFileName:      'ortinfo',
        // The base name of the css file served in the <link rel="stylesheet" src="the_name.*.css">
        cssFileName:     'ortinfo',
        main:            appDir + '/app.js',
        developmentMode: config.isDev,
        // Specify any non-commonjs libraries we wish to include.
        // You can think of this as your list of <script> tags in your HTML.
        // These will simply be included before any of your application code in the
        // order you provide them. So for example, if you're using jQuery make sure
        // you list any plugins after jQuery itself.
        // loading jquery here instead of requiring in files, to be able to load plugins
        libraries: [
            libDir + '/jquery.js',
            libDir + '/jquery-ui.js'
        ],
        // Specify the stylesheets we want to bundle
        stylesheets: [
            cssDir + '/bootstrap.css',
            cssDir + '/jquery-ui.css',
            cssDir + '/jquery-ui.structure.css',
            cssDir + '/app.css'
        ],
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(__dirname + '/templates', appDir + '/templates.js');
            }
        },
        beforeBuildCSS: function (done) {
            // We only want to do this in dev mode. If it's not in dev mode, this
            // function will only be run once.
            if (!config.isDev) {
                done();
                return;
            }
            // Re-compile stylus to css each time the app's main css file is requested.
            // In addition there's a "watch" option that will make stylizer also be able
            // to talk to livereaload (http://livereload.com/) browser plugins for sneakily
            // refreshing styles without waiting for you to refresh or running/configuring
            // the live reload app.
            stylizer({
                infile:      cssDir + '/app.styl',
                outfile:     cssDir + '/app.css',
                development: true,
                // Beware there's an issue with watch on OSX that causes issues with
                // watch if you're not running node 0.10.25 or later.
                watch:       cssDir + '/**/*.styl'
            }, done);
        }
    }
};
