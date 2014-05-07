(function(){
    var redirectKey = 'ir.loginRedirectRoute';
    Session.set(redirectKey, null);
    
    _.extend(Router, {
       _route: Router.route,
        route: function(name, options){
            function isLoggedIn() {
                if(options.isLoggedIn !== undefined)
                    return options.isLoggedIn();
                else
                    return (Meteor.user() !== null);
            }

            if(options.redirectOnLogin && Session.get(redirectKey)){
                var rname = Session.get(redirectKey);
                Session.set(redirectKey, null);
                
                return this.redirect(rname);
            }
            
            if(options.loginRequired || options.redirectOnLogin){
                var onBeforeAction = null;
                if(options.onBeforeAction && _.isFunction(options.onBeforeAction)){
                    onBeforeAction = options.onBeforeAction;   
                }
                
                options.onBeforeAction = function(pause){
                    if(Meteor.loggingIn())
                        return pause();
                        
                    if(options.redirectOnLogin && Meteor.user()){
                        if(Session.get(redirectKey)){
                            var rname = Session.get(redirectKey);
                            Session.set(redirectKey, null);
                            
                            return this.redirect(rname);
                        }
                    }
                    
                    if(options.loginRequired){
                        if(typeof options.loginRequired == 'string' || options.loginRequired instanceof String){
                            var routeName = options.loginRequired;

                            options.loginRequired = {
                                name: routeName,
                                shouldRoute: true
                            };
                        }

                        if(!options.loginRequired.hasOwnProperty('shouldRoute')){
                            options.loginRequired.shouldRoute = true;
                        }

                        if(!isLoggedIn()){
                            Session.set(redirectKey, Router.current().path);

                            if(options.loginRequired.shouldRoute){
                                return this.redirect(options.loginRequired.name);       
                            }else{
                                if(options.loginRequired.layout){
                                    this.layoutTemplate = options.loginRequired.layout;
                                }
                                this.render(options.loginRequired.name);
                                this.renderRegions();
                                return pause();
                            }
                        }
                    }
                    
                    if(onBeforeAction)onBeforeAction.call(this);
                };
            }
            
            Router._route(name, options);
        }
    });
})();
