
function OfflineGame() {

  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'canvasholder', { preload: preload, create: create, update: update });
  var dealService = null;
  var players = [
    {name: "Player", isBot: false, score: 0, cards:null, dealer:true, position:{horizontal:window.innerWidth/2, vertical:window.innerHeight - 80}, rotate:0},
    {name: "Csabi", isBot: true, score: 0, cards:null, position:{horizontal: 90, vertical: 90}, rotate:-30},
    {name: "Goon", isBot: true, score: 0, cards:null, position:{horizontal:window.innerWidth - 90, vertical: 90}, rotate:30}
  ];

  function newGame() {
    dealService = new DealService();
    dealService.deal(players, setDealer);

    setupPlayers();

    
  }

  function setDealer(talon) {
    for(var i = 0; i < players.length; i++) {
      var player = players[i];
      if(player.dealer) {
        player.cards.push(talon[0]);
        player.cards.push(talon[1]);
        return;
      }
    }
  }

  function setupPlayers() {
    for(var i=0; i< players.length; i++) {
      var pData = players[i];
      var player = new Player(pData);

      players.instance = player;
      player.events.cardClicked.add( function(card){
        game.add.tween(card).to( { x: window.innerWidth/2, y: 90 }, 2000, Phaser.Easing.Bounce.Out, true);
      })
    }
  }


  function Player(data) {

    var events = {
      cardClicked: new signals.Signal()
    }

    console.log("Player initialized.");
    this.inputEnabled = true
    var spot = game.add.button(data.position.horizontal, data.position.vertical, 'spot');
    spot.anchor.setTo(0.5, 0.5);

    function setupCards() {
      for(var i = 0; i < data.cards.length; i++) {
        var card = data.cards[i];
        var inst = game.add.button(spot.x, spot.y, 'cards');
        inst.frameName = data.isBot == true ? 'cardback2.png' : card.name + '.png';
        inst.name = card.name;
        inst.anchor.setTo(0.5, 0.5);
        inst.width = window.innerWidth/6;
        inst.height = inst.width * 1.76;
        inst.angle = data.rotate + (i*2);

        if(data.isBot == false) {
          inst.inputEnabled = true;
          inst.input.useHandCursor = true;
        console.log("add listener")
          inst.onInputDown.add(onDown, this);
        }
      }
    }

    function onDown(sprite, pointer) {
      console.log("Card Clicked")
      events.cardClicked.dispatch(sprite);
    }


    setupCards();

    return {
      events: events
    }

  }


  function preload() {
    this.load.image("spot", 'assets/sign1.png');
    this.load.atlas('cards', 'assets/cards_texture_atlas.png', 'assets/cards_texture_atlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
  }

  function create() {
    newGame();
  }

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    console.log("click")

}

  function over() {
    console.log('button over');
  }

  function out() {
    console.log('button out');
  }

  function render() {
     game.debug.pointer(game.input.pointer1);
  }

  function update() {
     if (game.input.activePointer.isDown) {
      console.log(game.input.activePointer)
     }
  }

  function actionOnClick () {
  }
}

