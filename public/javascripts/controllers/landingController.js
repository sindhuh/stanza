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
		  $scope.primaryColor = $scope.parseColor2($scope.primaryColor);
		  $scope.secondaryColor = $scope.parseColor2($scope.secondaryColor);
		  $scope.primaryBGStyle = {'background-color': $scope.primaryColor};
		  $scope.secondaryBGStyle = {'background-color': $scope.secondaryColor};
	  };
		$scope.convertToRGB = function(c) {
			return 'rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ')';
		};

		// This doesnt work because we have different formats to support.
		$scope.parseColor = function(input) {
			var div = document.createElement('div'), m;
			div.style.color = input;
			m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
			if( m) return [m[1],m[2],m[3]];
			else throw new Error("Colour "+input+" could not be parsed.");
		};
		$scope.parseColor2 = function(c) {
			    if (!c) {
					return null;
				}
				c= c.toLowerCase().trim();
				if (/^[a-z]+$/.test(c)){
					var colornames={
						aqua:'#00ffff', black:'#000000', blue:'#0000ff', fuchsia:'#ff00ff',
						gray:'#808080', green:'#008000', lime:'#00ff00', maroon:'#800000',
						navy:'#000080', olive:'#808000', orange:'#ffa500', purple:'#800080',
						red:'#ff0000', silver:'#c0c0c0', teal:'#008080', white:'#ffffff',
						yellow:'#ffff00'
					};
					c= colornames[c];
				}
			    // If # is missing, append it.
				if(/^([a-f0-9]{3}){1,2}$/.test(c)) {
					c = "#" + c;
				} else if (/\d+.,.\d+.,.\d+/.test(c)) {
					c = 'rgb' + c;
				}
			    console.log(">>> c is ", c);
				if(/^#([a-f0-9]{3}){1,2}$/.test(c)){
					if(c.length== 4){
						c= '#'+[c[1], c[1], c[2], c[2], c[3], c[3]].join('');
					}
					c= '0x'+c.substring(1);
					return $scope.convertToRGB([(c>>16)&255, (c>>8)&255, c&255 ]);
				} else if(c.indexOf('rgb')== 0){
					c= c.match(/\d+(\.\d+)?%?/g);
					if(c){
						for(var i= 0;i<3;i++){
							if(c[i].indexOf('%')!= -1){
								c[i]= Math.round(parseFloat(c[i])*2.55);
							}
							if(c[i]<0) c[i]= 0;
							if(c[i]>255) c[i]= 255;
						}
						return $scope.convertToRGB(c);
					}
				}
			return c;
		}
}]);