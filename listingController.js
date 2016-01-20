angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    //For the submitting of a new item
    $scope.newItem = {
      code: '', //Take chars
      name: '',
      coordinates: { //Wrap in coordinates object like in listingFactory.js
        latitude: 0,
        longitude: 0 //Lat/Long take numbers not chars
      },
      address: ''
    };

    $scope.addItem = function() {
      //Create new object with data from form
      var newListingToInsert = {
        code: $scope.newItem.code,
        name: $scope.newItem.name,
        coordinates: {
          latitude: $scope.newItem.coordinates.latitude,
          longitude: $scope.newItem.coordinates.longitude
        },
        address: $scope.newItem.address,
      }
      //Add to array of listings
      $scope.listings.push(newListingToInsert);
      //Reset the form
      reset();
    };

    //Resets the form when called
    var reset = function() {
      $scope.newItem.code = '';
      $scope.newItem.name = '';
      $scope.newItem.coordinates.latitude = 0;
      $scope.newItem.coordinates.longitude = 0;
      $scope.newItem.address = '';
    };
    //Need to reset on load else shows empty objects
    reset();

    $scope.deleteItem = function(index) {
      //The splice() method adds/removes items to/from an array
      //http://www.w3schools.com/jsref/jsref_splice.asp
      $scope.listings.splice(index, 1);
    };

    //When this gets called, set the undefined 'detailedInfo' for the item
    $scope.itemDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

  }
]);
