app.controller('LandingController', [
	'$scope', 
	'$state',
	'$rootScope',
	function(
		$scope,
		$state,
		$rootScope) {
	'use strict';
	console.log('#### Landing Controller');

	/**
	 * Init
	 */
	 $scope.tiles = [];

	 // Generate 120 dummy tiles and asssign them to $scope.tiles
	 for(var i = 0; i < 120; i++) {
	 	var tile = {
	 		"title": "Some Title",
	 		"image": "http://blog.hdwallsource.com/wp-content/uploads/2015/03/awesome-lamborghini-pictures-28162-28884-hd-wallpapers.jpg"
	 	}
	 	$scope.tiles.push(tile);
	 }

	 /**
	  * Ui-responders
	  */

	  $scope.setTheme = function() {
	  	console.log("#### PRIMARY COLOR - " + $scope.primaryColor);
	  	console.log("#### SECONDARY COLOR - " + $scope.secondaryColor);
	  };

}]);