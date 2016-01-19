angular.module('timesheetApp')

.directive('timesheet',[() => {

	return {
		restrict: 'E',
		templateUrl: 'js/Timesheet/timesheet.html',
		scope: {
			data: '='
		}
	};


}]);