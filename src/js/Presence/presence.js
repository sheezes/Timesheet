angular.module('timesheetApp')

.directive('presence',() => {

	class presenceController {

		constructor() {

		}

		hourSum(date1,date2) {

			let msDiff = new Date(date1 - date2),
				hours = msDiff.getUTCHours(),
				minutes = msDiff.getUTCMinutes().toString();

			minutes = minutes.length === 1 ? '0' + minutes : minutes;

			return `${hours}:${minutes}`;
		}

	}

	function link(scope, element, attr) {
		scope.$watch(attr.presence, function(newValue, oldValue) {
			scope.data = scope[attr.presence];
		});
	}

	return {
		restrict: 'A',
		templateUrl: 'js/Presence/presence.html',
		// scope: {
		// 	data: '=presence'
		// },
		link: link,

		controllerAs: 'presence',
		controller: presenceController
	};


});