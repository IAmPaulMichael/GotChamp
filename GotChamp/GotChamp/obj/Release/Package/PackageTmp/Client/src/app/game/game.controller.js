'use strict';

	if (!Array.prototype.find) {
			  Array.prototype.find = function(predicate) {
				if (this == null) {
				  throw new TypeError('Array.prototype.find called on null or undefined');
				}
				if (typeof predicate !== 'function') {
				  throw new TypeError('predicate must be a function');
				}
				var list = Object(this);
				var length = list.length >>> 0;
				var thisArg = arguments[1];
				var value;

				for (var i = 0; i < length; i++) {
				  value = list[i];
				  if (predicate.call(thisArg, value, i, list)) {
					return value;
				  }
				}
				return undefined;
			  };
		};
		
	if (!Array.prototype.findIndex) {
	  Array.prototype.findIndex = function(predicate) {
		if (this == null) {
		  throw new TypeError('Array.prototype.findIndex called on null or undefined');
		}
		if (typeof predicate !== 'function') {
		  throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
		  value = list[i];
		  if (predicate.call(thisArg, value, i, list)) {
			return i;
		  }
		}
		return -1;
	  };
	};

angular.module('gotChamp')
	.controller('GameCtrl', ['$scope',function($scope){
		
		$scope.rows = [];
		$scope.combination = [];
		
		function initializeNumberPad(){
			for(var i = 1; i <= 60; i+=1){
				$scope.rows.push({selected:false, digit: i});
			}
		};
	
		function resetSelection(){
			$scope.combination = [];
			$scope.rows.find(function(element, index, array){
				if (element.selected === true){
					element.selected = false;
				}
			});
		};
			
		function getRandomInt(min, max) {
		  return Math.floor(Math.random() * (max - min)) + min;
		}

		initializeNumberPad();
		$scope.resetCombination = function(){
			resetSelection();
		};
		
		$scope.generateNumber = function(){
			resetSelection();
			while($scope.combination.length < 6){
				$scope.chooseNumber({selectd: false, digit: getRandomInt(1,61)});
			}
			
		};
		$scope.chooseNumber = function(rec){
			if ($scope.combination.length == 6){
				return;
			}
			$scope.rows.find(function(element, index, array){
				if (element.digit === rec.digit){
					if (element.selected === false){
						element.selected = true;
						addToCombination(element);
						return true;
					}else{
						element.selected = false;
						removeFromCombination(element);
					}
				}
				
			});
		};
		
		$scope.removeFromCombination = function(rec){
			$scope.rows.find(function(element, index, array){
				if (element.digit === rec.digit){
					element.selected = false;
					removeFromCombination(element);
					return true;
				}
			});
		};
		
		function addToCombination(rec){
		
			var found = $scope.combination.find(function(element, index, array){
				if (element.digit == rec.digit){
					return true;
				}
			});
			
			if (!found){
				$scope.combination.push(rec);
			}
		};
		
		function removeFromCombination(rec){
			 var index = $scope.combination.findIndex(function(element, index, array){
				if (element.digit === rec.digit){
					return true;
				}			
			});
			
			if (index >= 0){
				$scope.combination.splice(index,1);
			}
		}
	}]);