
var express = require("express");
var morgan = require('morgan');
let bodyParser= require('body-parser');

var db;
var app = express();
app.use(express.static(__dirname + '/'))

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
var runners = [];
let MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs')
app.use(bodyParser.json())

require('./routes/user.js').init(app);
MongoClient.connect('mongodb://andrew:password@ds145997.mlab.com:45997/test-hw-11', function(err, database){
	if (err) return console.log(err);
  	db = database;


  // ... start the server
});
app.listen(50000);
console.log("Server listening at http://localhost:50000/");

app.get("/read", function (request, response) {

	 db.collection('runners').find().toArray(function(err, results) {
    	if (err) return console.log(err)
    	// renders index.ejs
    	response.render('index.ejs', {runners: results});
    });

 });

app.post('/create', function (request, response) {
	db.collection('runners').save(request.body, function(err, result) {
    if (err) return console.log(err);

    console.log('saved to database');
    response.redirect('/read');
  });
	runners.push(request.body);
});

app.put('/put', function (request, response) {
	  db.collection('runners').findOneAndUpdate({name: ''}, {
	  $set: {
	      name: request.body.name,
	    }
	  }, {
	    sort: {_id: -1},
	    upsert: true
	  }, (err, result) => {
	    if (err) return response.send(err)
	    response.send(result)
	  })
});

app.delete('/delete', function (request, response) {
	db.collection('runners').remove();
	response.redirect('/read');
});

// //Requirements
// var express = require('express');
// var morgan = require('morgan');
// var path = require('path');
// var favicon = require('serve-favicon');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');

// var ejs = require('ejs');
// var db;
// var index = require('./routes/index');
// var users = require('./routes/users');
// var projects = [];
// var app = express();

// app.use(bodyParser.json());
// // MongoClient.connect('mongodb://nbuchwald:bubbi727@ds159517.mlab.com:59517/porfoliobuilder', function(err, database){
// // 	if (err) return console.log(err);
// //   	db = database;
// // });

// app.use(bodyParser.urlencoded({ extended: true }));
// let MongoClient = require('mongodb').MongoClient;
// // getting-started.js
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/projects');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });
// app.listen(50000, function(){
// console.log("Server listening at http://localhost:50000/");
// });

// module.exports = app;


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');  

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('dev'));
// app.use(morgan('tiny'));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
// // static file linking to Start Bootstrap's Template
// app.use('/vendor',express.static(path.join(__dirname, 'vendor')));
// app.use('/js',express.static(path.join(__dirname, 'js')));
// app.use('/data',express.static(path.join(__dirname, 'data')));
// app.use('/dist',express.static(path.join(__dirname, 'dist')));
// app.use('/public',express.static(path.join(__dirname, 'public')));



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// app.get("/read", function (request, response) {
// 	console.log("READ")
// 	 db.collection('projects').find().toArray(function(err, results) {
//     	if (err) return console.log(err)
//     	// renders index.ejs
//     	response.render('index.ejs', {projects: results});
//     });

//  });

// // Note: request and response are usually written as req and res respectively.
// app.post('/create', function (request, response) {
// 	// console.log(request.body)
// 	console.log("CREATEwowowowow")
// 	db.collection('projects').save(request.body, function(err, result) {
//     if (err) return console.log(err);

//     console.log('saved to database!!');
//     response.redirect('/read');
//   });
// 	projects.push(request.body);
// });

// app.put('/put', function (request, response) {
// 	  db.collection('projects').findOneAndUpdate({name: ''}, {
// 	  $set: {
// 	      name: request.body.name,
// 	    }
// 	  }, {
// 	    sort: {_id: -1},
// 	    upsert: true
// 	  }, (err, result) => {
// 	    if (err) return response.send(err)
// 	    response.send(result)
// 	  })
// });

// app.delete('/delete', function (request, response) {
// 	db.collection('projects').remove();
// 	response.redirect('/read');
// });




