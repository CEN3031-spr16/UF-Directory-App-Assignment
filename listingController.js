angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
      $scope.addListing = function() {
          $scope.lisings.push($scope.newItem);
          $scope.newItem = '';

      };
     */

    $scope.deleteListing = function(index) {
        $scope.listings.splice(index, 1);
    };
    $scope.showDetails = function(index) {
        $scope.newItem = $scope.listings[index];
    };
  }
]);
