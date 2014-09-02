Package.describe({
    summary: "An iron-router module that gives you the ability to configure your routes so that only allow authenticated users may access them"
    version: "1.0.0",
    git: "https://github.com/fuatsengul/iron-router-auth"
    
});

Package.on_use(function(api){
    api.versionsFrom('METEOR@0.9.0.1');
    api.use([
    'iron:router', 'session', 'underscore'
    ], 'client');

    api.addFiles([
        'LICENSE',
        'lib/iron-router-auth.js'
    ], 'client');
});
