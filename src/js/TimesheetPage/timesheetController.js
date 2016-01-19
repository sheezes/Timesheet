class timesheetController {

	constructor($filter, dataService) {
		
		this.$filter = $filter;
		this.dataService = dataService;

		this.monthlyData = null;

		// get available timesheet
		dataService.getAvailableTimesheets().then((data) => {
			this.availableTimesheets = data;
		});

	}

	setMonthLabel(month, year) {

		let generatedDate = new Date();

		generatedDate.setYear(year);
		generatedDate.setMonth(month);

		return this.$filter('date')(generatedDate, 'MMMM yyyy');
	}


	getMonthlyData(month,year) {

		this.dataService.getTimesheet(month,year).then((data) => {
			this.monthlyData = data;
		});

	}

}

timesheetController.$inject=['$filter','dataService'];


angular.module('timesheetApp')
	.controller('timesheetPageController',timesheetController);