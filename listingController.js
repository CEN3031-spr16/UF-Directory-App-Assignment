angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
	$scope.tempList={
		code:'',
		name:'',
		coordinates: {
			latitute: '',
			longitude:''
		},
		address:''
	}
	var resettempList=function(){
		$scope.tempList.code = '';
        $scope.tempList.name = '';
        $scope.tempList.coordinates.latitute = '';
        $scope.tempList.coordinates.longitude = '';
        $scope.tempList.address = '';			
	}
	resettempList();
	
    $scope.addListing = function() {
		var newListing={
            code: $scope.tempList.code, 
            name: $scope.tempList.name, 
            coordinates: {
                latitude: $scope.tempList.coordinates.latitute, 
                longitude: $scope.tempList.coordinates.longitude 
            }, 
            address: $scope.tempList.address
        }
		$scope.listings.push(newListing);
        resettempList();
	};
    $scope.deleteListing = function(code) {
		$scope.listings.forEach(function (element,index,array){
			if(element.code==code){
				$scope.listings.splice(index,1);}}
	);};
    $scope.showDetails = function(code) {
		$scope.listings.forEach(function (element,index,array){
			if(element.code==code){
			$scope.detailedInfo=$scope.listings[index];
			}	
	});
  };
  }
]);