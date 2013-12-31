Package.describe({
    summary: "An iron-router module that gives you the ability to configure your routes so that only allow authenticated users may access them"
});

Package.on_use(function(api){
    api.use([
    'iron-router'
    ], 'client');

    api.add_files([
        'LICENSE',
        'lib/iron-router-auth.js'
    ], 'client');
});
