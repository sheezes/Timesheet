class dataService {

	constructor($q,$http) {

		this.$q = $q;
		this.$http = $http;

		this.monthlyData = {};
		this.availableTimesheets = [];

	}

	getAvailableTimesheets() {

		var deferred = this.$q.defer(),
			promise = deferred.promise;

		this.$http.get('dummyData/availableTimesheets.json').then((data) => {
			this.availableTimesheets = data.data;
			deferred.resolve(data.data);
		}).catch((e) => {
			console.log(e);
			deferred.reject('dataService.getAvailableTimesheets: Error');
		})

		return(promise);

	}


	getTimesheet(month,year) {

		var deferred = this.$q.defer(),
			promise = deferred.promise;

		// available locally
		if (this.monthlyData[month + '_' + year]) {
			deferred.resolve(this.monthlyData[month + '_' + year]);

		// get from server
		} else {
			this.$http.get('dummyData/timesheet_' + month + '_' + year + '.json', {cache: true}).then((data) => {

				data.data.presence = data.data.presence.map( (p) => {
					p.startDate = new Date(p.startDate);
					p.endDate = new Date(p.endDate);

					return p;
				});

				this.monthlyData[month + '_' + year] = data.data;

				deferred.resolve(data.data);

			}).catch((e) => {
				console.log(e);
				deferred.reject('dataService.getTimesheet: Error');
			});	
		}

		return(promise);

	}

}


dataService.$inject = ['$q','$http'];

angular.module('timesheetApp')
	.service('dataService',dataService);