// ------------------ Module Exports ---------------------------
var express = require('express');
var hdbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var burgers_controller = require('./app/controllers/burgers_controller.js');
var api_controller = require('./app/controllers/api_controller.js');
var db = require('./app/models')
// ------------------ SETTING UP SERVER ---------------------------

// Create express app
var app = express();
var port = process.env.PORT || 8080;

// Sync up database
db.sequelize.sync().then( () => {
    app.listen(port, () => {
        console.log('listen to port:',port)
    })
})

// Set path for views directory
app.set('views',path.join(__dirname,'/app/views'));

// Set view engine to handlebars
app.engine('handlebars', hdbs({
                        defaultLayout: 'main',
                        layoutsDir: 'app/views/layouts'
            })
);

app.set('view engine', 'handlebars');

// Serve static files to server (css, js, img)
app.use( express.static(path.join(__dirname,'app/public')) );

// Parse body of incoming request
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// Allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// Set up controller for api
app.use('/api/',api_controller)
// Set up controller for burgers
app.use('/',burgers_controller)



