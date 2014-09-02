I'm fixing the compatibility issue to meteor 0.9.x right now.
Do not use this package yet if you see this message!!!


iron-router-auth
================

Extends the iron-router package, allowing you to quickly lock routes down to authenticated users. It also provides the ability to auto-redirect back to the previous route on a successful login.

customizing the authentication logic
====================================

You can now customize the authentication logic by overriding the `isLoggedIn` method. It defaults to

```js
return (Meteor.user() !== null);
```

An example implementation

```js
loginRequired: {
  name: 'login',
  shouldRoute: false,
  isLoggedIn = function(){
    return (Meteor.user() !== null) && (...); //custom logic here
  }
}
```

requiring authentication for your route
=======================================

You can set this up on your route by passing the `loginRequired` property to the route options. The value needs to be the name of your route used for logging in. This value can either be a string that represents your route name. In this scenario the users will be redirected to the route. If however you use the more verbose approach, you can choose to simply render the view while keeping the current url path.

```js
//easiest method
Router.map(function(){
    this.route('dashboard', {
        path: '/dashboard',
        loginRequired: 'login'
    });
    
    ...
});

//more verbose, allowing you to set not only the view to render, but the layout if you need to switch it
//the layout and view only works when you set shouldRoute to false
Router.map(function(){
   this.route('dashboard', {
        path: '/dashboard',
        loginRequired: {
            name: 'login',          //name of view/template to render, aka route.template
            shouldRoute: false,     //render instead of redirect,keeps your url intact (defaults to true)
            layout: 'main'          //allows you to specify a different layout, in case your auth vs anonymous pages use different layouts
        }
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

extending the method that checks to see if the user is logged in
================================================================

You are now able to override the default behaviour of the method that checks to see if the user is logged in. To do so, define your own method and assign it to the `isLoggedIn` option. 

```js
Router.map(function(){
    this.route('dashboard', {
        path: '/',
        loginRequired: true,
        isLoggedIn: function(){
          ...
          //place custom logic here, maybe for roles etc. 
        }
    });
});
```
