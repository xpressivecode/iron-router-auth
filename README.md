iron-router-auth
================

Extends the iron-router package, allowing you to quickly lock routes down to authenticated users. It also provides the ability to auto-redirect back to the previous route on a successful login.

requiring authentication for your route
=======================================

You can set this up on your route by passing the `loginRequired` property to the route options. The value needs to be the name of your route used for logging in.

```js
Router.map(function(){
    this.route('dashboard', {
        path: '/dashboard',
        loginRequired: 'login'
    });
    
    ...
});
```

setting up automatic redirection on a successful login
======================================================

If you want to have the module automatically redirect your users back to where they initially attempted to visit, but were restricted due to the `loginRequired` property, simply
pass the `redirectOnLogin` property to the route options. It is a `Boolean` value type.

```js
Router.map(function(){
    this.route('login', {
        path: '/login',
        redirectOnLogin: true
    });
    
    ...
});
```

How this works: when you use the `loginRequired` property, the module will set a `Session` value (using the key `ir.loginRedirectRoute`). When your login is successful, the module checks the state of this Session object and will attempt to redirect the user back to the url. 

You can manually accomplish the same thing if you want by accessing the value yourself via 

```js
var url = Session.get('ir.loginRedirectRoute');
return Router.go(url);
//or if you are already in a controller action
return this.redirect(url);
```


