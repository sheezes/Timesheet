class timesheetAppController {

	constructor($compile, $http, presenceTypes) {

		this.$compile = $compile;

		this.presenceTypes = presenceTypes;
		
		this.resetInputs();

		$http.get('js/ModifyPresence/PreseneceModal.html',{ cache: true }).then((template) => {
			this.modalTemplate = angular.element(template.data);
		});

	}

	savePresence() {

		// validate
		this.validEntrance = this.validateDateString(this.entrance);
		this.validLeaving = this.validateDateString(this.leaving);

		if (!this.validEntrance || !this.validLeaving) {
			this.errorMessage = 'Please check your hour report (e.g: 8:00)';
			return;
		}
		
		// entrance
		let entranceTime = this.entrance.split(':').map( timeUnit => parseInt(timeUnit) ),
			startDate = new Date(this.timesheet.year, this.timesheet.month, this.day, entranceTime[0], entranceTime[1], 0);

		// leaving
		let leavingTime = this.leaving.split(':').map( timeUnit => parseInt(timeUnit) ),
			endDate = new Date(this.timesheet.year, this.timesheet.month, this.day, leavingTime[0], leavingTime[1], 0);
		
		let presenceToUpdate = this.presenceData || {};
		presenceToUpdate.comment = this.comment,
		presenceToUpdate.startDate = startDate,
		presenceToUpdate.endDate = endDate,
		presenceToUpdate.type = this.type

		if (!presenceToUpdate.id) {
			presenceToUpdate.id = this.timesheet.presence.length+1,
			this.timesheet.presence.push(presenceToUpdate);
		}
		
		this.exit();
	}


	// validate format of entrance/leaving strings
	validateDateString(dateString) {

		if (!dateString)
			return false;

		if (dateString.indexOf(':') === -1)
			return false;

		let dateArray = dateString.split(':').map( timeUnit => parseInt(timeUnit) );

		if (dateArray.length > 2)
			return false;

		let hours = parseInt(dateArray[0]);
		let minutes = parseInt(dateArray[1]);

		if ((dateArray[0].length > 2) || (isNaN(hours)) || (hours > 23) || (hours < 0))
			return false;

		if ((dateArray[1].length > 2) || (isNaN(minutes)) || (minutes > 59) || (minutes < 0))
			return false;

		return true;

	}

	resetInputs() {
		this.entrance = null;
		this.leaving = null;
		this.type = "Normal";
		this.day = 1;
		this.comment = null;
		this.validEntrance = true;
		this.validLeaving = true;
		this.errorMessage = null;
	}

	exit() {
		this.resetInputs();
		angular.element(document.getElementById('modalBody')).addClass('modal-out');

		setTimeout( () => {
			angular.element(document.getElementById('modalBody')).removeClass('modal-out');
			angular.element(this.modalTemplate[0]).remove();	
		}, 300);
		
	}

}

timesheetAppController.$inject = ['$compile','$http','presenceTypes']


angular.module('timesheetApp')

.directive('modifyPresence',['$compile', ($compile) => {

	function link(scope, element, attributes) {
	
		angular.element(element[0]).on('click', () => {

			let daysInMonth = new Date(scope.timesheet.year, scope.timesheet.month+1, 0).getDate();
				scope.modal.daysInMonth = new Array(daysInMonth).fill(1).map((value,index) => {
					return index+1;
				});

			scope.modal.timesheet = scope.timesheet;
			scope.modal.presenceData = scope.presenceData;

			if (scope.presenceData) {

				let minutes = '0' + scope.presenceData.startDate.getMinutes();
				minutes = minutes.substr(minutes.length-2,2);
				scope.modal.entrance = `${scope.presenceData.startDate.getHours()}:${minutes}`;

				minutes = '0' + scope.presenceData.endDate.getMinutes();
				minutes = minutes.substr(minutes.length-2,2);

				scope.modal.leaving = `${scope.presenceData.endDate.getHours()}:${minutes}`;

				scope.modal.type = scope.presenceData.type;
				scope.modal.comment = scope.presenceData.comment;
				scope.modal.day = scope.presenceData.startDate.getDate();
			}

			angular.element(document).find('body').append(scope.modal.modalTemplate[0]);
			$compile(scope.modal.modalTemplate[0])(scope);
		});
	}


	return {
		restrict: 'A',
		scope: {
			timesheet: '=',
			presenceData: '=?'
		},
		link: link,
		controllerAs: 'modal',
		controller: timesheetAppController
	};

}]);