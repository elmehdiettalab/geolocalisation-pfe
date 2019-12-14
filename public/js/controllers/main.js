
angular.module('todoController', ['ngMap' , 'firebase'])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope' , '$firebaseArray' , function($scope , $firebaseArray ,NgMap , $timeout ) {
		
  $scope.mapsApiUrl = 'AIzaSyA3ZMA6KlxboXRuA7ItNNSlJp3xcgjaB0M'; // check the ng-map docs for api url and api key
  
    
//	$scope.coords = [];

//	$scope.coords = [34,-6] ; 
	
	$scope.object = {} ; 
	$scope.object.Title = "HI THERE" ; 
  $scope.$onInit = onInit;
  
  function onInit() {
    NgMap.getMap().then(function (mapInstance) {
      // vm.map = mapInstance;
      // The line above is enough but if you are using ui-router
      // maybe the code below is necessary
      var center = mapInstance.getCenter();
      
      google.maps.event.trigger(mapInstance, 'resize');
      mapInstance.setCenter(center);
      
      $timeout(function () {
        $scope.map = mapInstance;
	  });
	  


	}) ; }
	

        
        // CREATE A FIREBASE REFERENCE
        var config = {
			apiKey: "AIzaSyAKoDxaWtWmvnDAvMBwddPeGt16gRPzALg",
			authDomain: "trackeur-backend.firebaseapp.com",
			databaseURL: "https://trackeur-backend.firebaseio.com",
			projectId: "trackeur-backend",
			storageBucket: "trackeur-backend.appspot.com",
			messagingSenderId: "981610558503"
		  };
		  firebase.initializeApp(config);

		  var ref = firebase.database().ref().child('coordinates');
   		 //$scope.todos = $firebaseArray(ref);

        // GET TODOS AS AN ARRAY

        // ADD TODO ITEM METHOD
        $scope.addTodo = function () {

            // CREATE A UNIQUE ID
            var timestamp = new Date().valueOf();

/*            var list = $firebaseArray(ref);
					list.$add({ id: timestamp , latitude : $scope.latitude , longitude : $scope.longitude  
						 }).then(function(ref) {
					var id = ref.key();
					console.log("added record with id " + id);
					list.$indexFor(id); // returns location in the array
					});

 */   
/*for(var i = 0 ; i< $scope.coord.length ; i++){
	if(i==3) i=0 ;
	setInterval(() => {
		$scope.coords = $scope.coord.$keyAt(i) ;  
		console.log($scope.coord.$keyAt(i)) ; 
	  }, 3000);
} */       

            $scope.latitude = "";
            $scope.longitude ="" ; 



			$scope.coord = $firebaseArray(ref) ; 
				//console.log(coord.length) ; 
					var i=0 ; 
					setInterval(() => {
						if(i==3) i=0 ; 
						var tmp  =$scope.coord.$getRecord( $scope.coord.$keyAt(i));  
						//console.log(coord.$getRecord( coord.$keyAt(i))) ; 
						$scope.coords =[tmp.lat,tmp.lon] ; 
						i++ ; 
						console.log('hi') ; 
					  }, 3000);
				
 			
        };


/*		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

	*/
  } ]);