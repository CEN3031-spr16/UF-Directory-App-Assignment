
angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
    function($scope, Listings) {

        $scope.listings = Listings;
        $scope.detailedInfo = undefined;
        $scope.selectedListing = "";
        $scope.updatedListing = {};
        $scope.markers = [];

        // functions ---------------------------------------------------------------

        $scope.addListing = function(listing) {
            if(!listing){
                return;
            }

            // copy listing to new object to prevent reference changes
            var newItem = $scope.copyListing(listing);

            // validate the input listing
            $scope.addListingMsg = "";
            var validate = $scope.validateNewListing(listing);

            if(validate.error){
                $scope.addListingMsg = validate.error;
                return;
            }

            // add the copy to the listings array
            $scope.listings.push(newItem);

            // clear the input listing
            $scope.inputListing = "";

            $scope.addListingMsg = "Added listing successfully.";
        };

        $scope.validateNewListing = function(listing){

            // new listings name and code must be unique
            for(var i = 0; i < $scope.listings.length; ++i){
                if($scope.listings[i].code == listing.code || $scope.listings[i].name == listing.name){
                    return {"error":"Duplicate building code or name."};
                }
            }

            // code must be between 3-5 characters
            if(listing.code.length > 5 || listing.code.length < 3){
                return {"error":"Building code must be between 3-5 characters."};
            }

            // address allowed empty, coordinates must be numbers or empty

            if(listing.coordinates &&
                (isNaN(listing.coordinates.latitude) || isNaN(listing.coordinates.longitude))){
                return {"error":"Coordinates must be a numeric value"};
            }

            return {"valid":"valid listing"};
        };

        $scope.copyListing = function (listing){
            var copy = {};
            copy.coordinates = {};

            // optional listing fields
            if(listing.coordinates && listing.coordinates.latitude && listing.coordinates.longitude){
                copy.coordinates.latitude = listing.coordinates.latitude;
                copy.coordinates.longitude = listing.coordinates.longitude;
            }

            if(listing.address){
                copy.address = listing.address;
            }

            // required listing fields
            copy.code = listing.code;
            copy.name = listing.name;

            return copy;
        };


        $scope.deleteListing = function(index){
            if($scope.selectedListing == $scope.listings[index])
            $scope.selectedListing = "";

        $scope.listings.splice(index,1);
    };

        $scope.markers = [];


        $scope.showDetails = function(index) {

            if($scope.listings[index].coordinates == null){
                return;
            }

            $scope.selectedListing = $scope.listings[index];
        };
    }
]);