(function(){
    var redirectKey = 'ir.loginRedirectRoute';
    Session.set(redirectKey, null);
    
    _.extend(Router, {
       _route: Router.route,
        route: function(name, options){
            if(options.redirectOnLogin && Session.get(redirectKey)){
                var rname = Session.get(redirectKey);
                Session.set(redirectKey, null);
                
                return this.redirect(rname);
            }
            
            if(options.loginRequired || options.redirectOnLogin){
                var before = null;
                if(options.before && _.isFunction(options.before)){
                    before = options.before;   
                }
                
                options.before = function(){
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

                        if(!Meteor.user()){
                            Session.set(redirectKey, Router.current().path);
                            if(options.loginRequired.shouldRoute){
                                return this.redirect(options.loginRequired.name);       
                            }else{
                                return this.render(options.loginRequired.name);
                            }
                        }
                    }
                    
                    if(before)before.call(this);
                };
            }
            
            Router._route(name, options);
        }
    });
})();