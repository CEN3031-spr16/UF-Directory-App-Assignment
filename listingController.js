angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.

     */
     $scope.addListing = function() {
         $scope.listings.push($scope.newListing);
         $scope.newListing = '';
     };
    $scope.deleteListing = function(building) {
          x = $scope.listings.indexOf(building);
          $scope.listings.splice(x, 1);
    };
    $scope.showDetails = function(building) {
        $scope.detailedInfo = building;
    };
  }
]);
