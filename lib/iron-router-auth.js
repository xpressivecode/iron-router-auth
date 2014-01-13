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
                
                if (! options.before)
                    options.before = []
                options.before.push(function(){
                    if(options.redirectOnLogin && Meteor.user()){
                        if(Session.get(redirectKey)){
                            var rname = Session.get(redirectKey);
                            Session.set(redirectKey, null);
                            
                            return this.redirect(rname);
                        }
                    }
                    
                    if(options.loginRequired){
                        if(!Meteor.user()){
                            Session.set(redirectKey, Router.current().path);
                            return this.redirect(options.loginRequired);   
                        }
                    }
                    
                    if(before)before.call(this);
                });
            }
            Router._route(name, options);
        }
    });
})();