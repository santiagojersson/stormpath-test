var express = require('express');
var stormpath = require('express-stormpath');
var http = require('http'); 
var app = express();
var cons = require('consolidate');
var path = require ('path');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


app.use(stormpath.init(app,{
    application:{
        href:"https://api.stormpath.com/v1/applications/4GsXi8CyyRlTZMHOC7ewpM"
    },
    website: true
}));

app.get('/',stormpath.authenticationRequired,stormpath.getUser,function(req,res){
   // res.send("Hi "+req.user.givenName);
   res.render("home.ejs",{client:req.user.email});
});

/**app.get('api/test', stormpath.apiAuthenticationRequired,function(req,res){
    res.send({test: 'successful!'});
});

app.get('/api',stormpath.loginRequired, function(req,res,next){
    req.user.createApiKey(function(err,key){
        if(err){
            return next(err);
        }
        res.send('API key ID: '+key.id+ 'API key secret: '+key.secret);
    })
});**/

app.on('stormpath.ready', function(){
    app.listen(process.env.PORT || 3000);
});
