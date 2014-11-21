
var express = require('express');
var favicon = require('serve-favicon');
var app = express();
//app.use(express.bodyParser());
app.use(favicon(__dirname + '/views/images/fav.ico'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Database connection 
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');


var producers = [
  { firstName : 'John', 
	lastName : 'McJohn', 
	email: 'gm@in.gr',
	afm : "1111111111"},
  { firstName : 'Taylor', 
	lastName : 'Davis', 
	email: 'gm@in.gr',
	afm : "22222222222"},
  { firstName : 'Jonathan', 
	lastName : 'Brown', 
	email: 'gm@in.gr',                                                          
	afm : "3333333333333"},
  { firstName : 'Tilemaxos', 
	lastName : 'Joffrey', 
	email: 'gm@in.gr',
	afm : "4444444444444444"}
];


app.get('/', function(req, res) {
  //res.type('text/html');
  //res.send('One day at Centaur Technologies');
  res.sendfile("views/index.html");
  //res.send('<p>some html</p>');
  });

  
app.get('/all', function(req, res) {
  res.type('text/plain');
  res.json(producers);
  });  
  
app.get('/producer/random', function(req, res) {
  var id = Math.floor(Math.random() * producers.length);
  var pro = producers[id];
  res.json(pro);
});

app.get('/magnesia', function(req, res) {
  //res.type('text/plain');
  //res.send('Volos Magnnisias');
	res.type('text/html');
	res.sendfile('views/ajax.html');
  
});

app.get('/producers/kozani', function(req, res) {
  res.type('text/plain');
  res.send('One day on Kozani, Kozani');
});

app.get('/producers/fthiotida', function(req, res) {
	res.type('text/plain');
	res.send('One day on Fthiotida, Lamia');
});
console.log("Breakpoint 1");

app.get('/producers/:id', function(req, res) {
	if(producers.length <= req.param('id') || req.param('id')  < 0) {
		res.statusCode = 404;
		return res.send('Error 404: No producer found');
	}  
	var pro = producers[req.param('id')];
	res.json(pro);
});

//////POST EXAMPLE//////////////////////////////////
app.post('/producer', function(req, res) {
	if(!req.body.hasOwnProperty('firstName') || !req.body.hasOwnProperty('lastName') 
	|| !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('afm')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	} 
 
 
	var newproducer = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		afm : req.body.afm
	}; 
 
	producers.push(newproducer);
	res.json(true);
});
console.log("Breakpoint 2");
///////////////////////////////////////////####
  
////////////PUT/////////////////////////////////////////////
app.put( '/producer/:id', function( req, res ) {
	
	producers[req.param('id')] = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		afm : req.body.afm
	};
	
    res.send(true);
});



//////////////DELETE/////////////////////
 app.delete('/producer/:id', function(req, res) {
	if(producers.length <= req.params.id) {
		res.statusCode = 404;
		return res.send('Error 404: No producer found');
	}  
	producers.splice(req.params.id, 1);
	res.json(true);
});
///////////////////////////////////////////####




app.listen(process.env.PORT || 8000);
console.log("Server running at http://127.0.0.1:8000/");
