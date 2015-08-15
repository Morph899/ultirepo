function DealService() {

	var deck = null;
	var cards = [
		{name:"asz",value:10},
		{name:"het",value:10},
		{name:"nyolc",value:10},
		{name:"kilenc",value:10},
		{name:"tiz",value:10},
		{name:"also",value:10},
		{name:"felso",value:10},
		{name:"kiraly",value:10},
	];

	var types = [
		{name:"makk"},
		{name:"tok"},
		{name:"sziv"},
		{name:"zold"}
	];


	function getDeck() {
		return deck;
	}

	function createDeck() {
		deck = new Array();

		for(var i=0; i< types.length; i++) {
			var type = types[i];

			for(var n=0; n<cards.length; n++) {
				var card = cards[n];
				var newCard = {name:type.name+"_"+card.name, value:card.value, type:type.name};
				deck.push(newCard);
			}
		}


		deck = shuffleDeck(deck);
	}

	function shuffleDeck(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

    		// And swap it with the current element.
    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
  		}

  		return array;
	}

	function dealCards(players, callback) {
		var talon = deck.splice(0,2);
		

		for(var i =  0; i < players.length; i++) {
			var player = players[i];
			player.cards = deck.splice(0,10);
		}

		callback(talon);
	}

	createDeck();

	return {
		deck:getDeck,
		deal:dealCards
	}
}