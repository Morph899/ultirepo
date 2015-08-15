angular.module("ulti.AppModel",[])
.service("AppModel",["$rootScope", function($rootScope) {
	this.events = {
		OFFLINE_GAME_INIT:"offline_game_init"
	};

	this.playing = false;
}]);