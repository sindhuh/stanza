app.controller('LandingController', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope,
              $state,
              $rootScope) {
        'use strict';
        console.log('#### Landing Controller');

        /**
         * Init
         */
        $scope.tiles = [];
        // Generate 120 dummy tiles and asssign them to $scope.tiles
        for (var i = 0; i < 120; i++) {
            var tile = {
                "title": "Some Title",
                "image": "http://blog.hdwallsource.com/wp-content/uploads/2015/03/awesome-lamborghini-pictures-28162-28884-hd-wallpapers.jpg"
            }
            $scope.tiles.push(tile);
        }

        /**
         * Ui-responders
         */

        $scope.setTheme = function () {
            $scope.primaryColor = $scope.parseColor2($scope.primaryColor);
            $scope.secondaryColor = $scope.parseColor2($scope.secondaryColor);
            console.log($scope.primaryColor);
            console.log($scope.secondaryColor);
            $scope.primaryBGStyle = {'background-color': $scope.primaryColor};
            $scope.secondaryBGStyle = {'background-color': $scope.secondaryColor};
        };
        $scope.convertToRGB = function (color) {
            return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
        };

        // This doesnt work because we have different formats to support.
        $scope.parseColor = function (input) {
            var div = document.createElement('div'), m;
            div.style.color = input;
            m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
            if (m) return [m[1], m[2], m[3]];
            else throw new Error("Colour " + input + " could not be parsed.");
        };
        $scope.parseColor2 = function (color) {
           
            color = color.trim();
            if (/^[A-Za-z]+$/.test(color)) {
                color = color.toLowerCase();
                var colornames = {
                    aqua: '#00ffff', black: '#000000', blue: '#0000ff', fuchsia: '#ff00ff',
                    gray: '#808080', green: '#008000', lime: '#00ff00', maroon: '#800000',
                    navy: '#000080', olive: '#808000', orange: '#ffa500', purple: '#800080',
                    red: '#ff0000', silver: '#c0c0c0', teal: '#008080', white: '#ffffff',
                    yellow: '#ffff00'
                };
                 color = colornames[color];
            }
            // If # is missing, append it.
            if (/^([a-f0-9]{3}){1,2}$/.test(color)) {
                color = "#" + color;
            } else if (/\d+.,.\d+.,.\d+/.test(color)) {
                color = 'rgb' + color;
            }
            console.log(">>> color is ", color);
            if (/^#([a-f0-9]{3}){1,2}$/.test(color)) {
                if (color.length == 4) {
                    color = '#' + [color[1], color[1], color[2], color[2], color[3], color[3]].join('');
                }
                color = '0x' + color.substring(1);
                return $scope.convertToRGB([(color >> 16) & 255, (color >> 8) & 255, color & 255]);
            } else if (color.indexOf('rgb') == 0) {
                color = color.match(/\d+(\.\d+)?%?/g);
                if (color) {
                    for (var i = 0; i < 3; i++) {
                        if (color[i].indexOf('%') != -1) {
                            color[i] = Math.round(parseFloat(color[i]) * 2.55);
                        }
                        if (color[i] < 0) color[i] = 0;
                        if (color[i] > 255) color[i] = 255;
                    }
                    return $scope.convertToRGB(color);
                }
            }
            return color;
        }
    }]);