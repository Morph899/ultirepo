ulti.controller("LoginController",['$scope','AppModel','$rootScope', function($scope, AppModel, $rootScope){



	$scope.onButtonItemClick = function(state) {
		switch(state) {
			case "login":
			break;

			case "register":
			break;

			case "offline":
			  $rootScope.$broadcast(AppModel.events.OFFLINE_GAME_INIT);
			break;
		}
	}
}])