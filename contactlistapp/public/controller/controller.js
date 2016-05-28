function ContactController($scope, $http) {
	//console.log("Hello There from ContactController");

	var refresh = function(){
		$http.get('/contactlist').success(function (response){
			//console.log("I got the response data from server");
			$scope.contactlist = response;
			$scope.contact = "";
		});
	}

	refresh();

	$scope.addContact = function (){
		//console.log($scope.contact);
		//fix for glitch
		//Clicking update on data, but using addcontact on that data. This actually inserts record with different json format with example below for wrong and correct
		//Wrong: {"_id" : "573ac5b953a74b0c1cefea82", "name" : "Vijay1", "email" : "Vijay1@email.com", "number" : "9999999991"}
		//Correct: { "_id" : ObjectId("573ac5b953a74b0c1cefea82"), "name" : "Vijay", "email" : "Vijay@email.com", "number" : "9999999999"}
		$scope.contact._id = "";
		//fix for glitch
		$http.post('/contactlist', $scope.contact).success(function (response){
			//console.log(response);
			refresh();
		});
	}

	$scope.removeContact = function(id){
		//console.log(id);
		$http.delete('/contactlist/'+id).success(function (response){
			//console.log(response);
			refresh();
		});
	}

	$scope.editContact = function (id){
		//console.log(id);
		$http.get('/contactlist/'+id).success(function (response){
			$scope.contact = response;
		});
	}

	$scope.updateContact = function(){
		//console.log($scope.contact._id);
		$http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function (response){
			console.log(response);
			refresh();
		});
	}

	$scope.clearContactFields = function (){
		$scope.contact = "";
	}
}
ContactController.$inject = ['$scope', '$http'];
angular.module('app', []).controller('ContactController', ContactController);

/**
	// http://stackoverflow.com/questions/28957120/angularjs-cannot-read-property-get-of-undefined-http
	var app = angular.module('app', []);
	app.controller('ImagesCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
	    $interval(function(){

	        $http.get('test.json').success(function(data){
	        $scope.notifications = data;
	        });
	    },5000);
	}]);

	//http://stackoverflow.com/questions/25111831/controller-not-a-function-got-undefined-while-defining-controllers-globally
*/
