var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res){
	//console.log("Received a http GET request");

	db.contactlist.find(function (err, docs){
		//console.log(docs);
		res.json(docs);
	});

});

app.post('/contactlist', function(req, res){
	//console.log(req.body);
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	//console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, docs){
		res.json(docs);
	});
});

app.get('/contactlist/:id', function (req, res){
	var id = req.params.id;
	//console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, docs){
		res.json(docs);
	});
});

app.put('/contactlist/:id', function (req, res){
	var id = req.params.id;
	//console.log(req.body.name);
	//console.log(req.body.email);
	//console.log(req.body.number);
	//console.log(req.body._id);
	//console.log(req.body);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, 
		new: true}, 
		function (err, docs){
			res.json(docs);
		});
});

app.listen(9000);
console.log('Server running at port 9000');
