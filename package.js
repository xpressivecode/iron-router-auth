Package.describe({
    summary: "Fixed version",
    version: "1.0.0",
    git: "https://github.com/fuatsengul/iron-router-auth"
    
});

Package.on_use(function(api){
    api.versionsFrom('METEOR@0.9.0.1');
    api.use([
    'iron:router@0.9.1', 'session@1.0.0', 'underscore@1.0.0'
    ], 'client');

    api.addFiles([
        'LICENSE',
        'lib/iron-router-auth.js'
    ], 'client');
});
