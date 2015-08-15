var ulti = angular.module("Ulti",['ngRoute',"ulti.AppModel"])
.controller("AppController",['$scope','AppModel','$rootScope','$location', function($scope, AppModel, $rootScope, $location){


	$scope.appModel = AppModel;
	$rootScope.$on(AppModel.events.OFFLINE_GAME_INIT, onOfflineGameInit);

	function onOfflineGameInit() {
		$location.path("offline");
	}

  $scope.getNavbarClass = function() {
    if($location.$$path.split("/")[1]== 'offline') {
      return 'game';
    }
  }

}])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })
  .when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })
  .when('/offline', {
    templateUrl: 'templates/offline.html',
    controller: 'OfflineGameController'
  });
})
