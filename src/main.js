var shuffleApi = "http://deckofcardsapi.com/api/shuffle/?deck_count=6"
var drawApi = "http://deckofcardsapi.com/api/draw/"
//<<deck_id>>/?count=2"
var API_PROXY = 'https://jsonp.afeld.me/?url=';
var API_URL = "http://deckofcardsapi.com/api";
var draw = $(".draw");
var start = $(".start");
var playerScore = [];
var houseScore = [];
var playerScoreTotal = 0;
var houseScoreTotal = 0;

//Main Problems.  Make face cards = 10.
//Option 1:  Make face cards = 10 before they get into the score arrays
//Option 2:  Leave face cards alone but use a for loop to go through the array and for each face card value add 10 to the scoreTotal
//Deal with aces after that
//then make end game states
//
//var playerScoreTotal = playerScore.reduce(function(previousValue, currentValue) {
//  return previousValue + currentValue;
//}


//"shuffles 6 decks, outputs data to drawcard/s"
start.on("click", function startgame(){
  getJSON(shuffleApi, function (data) {
  drawCards(data);
  });

//drawCards makes the cards appear on the page and passes values to the score arrays

  function drawCards(data) {
    getJSON(drawApi + data.deck_id + "/?count=4", function (cardData) {
   console.log(cardData);
   console.log(cardData.cards[0]);
   //creating score arrays  // but parses NaN if a face card...
   playerScore = playerScore.concat(parseInt(cardData.cards[0].value));
   playerScore = playerScore.concat(parseInt(cardData.cards[1].value));
   houseScore = houseScore.concat(parseInt(cardData.cards[2].value));
   houseScore = houseScore.concat(parseInt(cardData.cards[3].value));
   //totals the score arrays
   playerScoreTotal = playerScore.reduce(function(prev, curr){
    return prev + curr;
      });
   houseScoreTotal = houseScore.reduce(function(prev, curr){
    return prev + curr;
      });


   //Lucas inspired code below for dealing with face values.  Doesnt quite work right now.  Just makes playerScoreTotal === 20
   //if(cardData.cards[0].value === "King" || "Queen" || "Jack") {
         //playerScoreTotal += 10;
   //}
   //if(cardData.cards[1].value === "King" || "Queen" || "Jack") {
     //playerScoreTotal += 10;
   //}
   ////End Lucas inspiration
     appendPlayerCard(cardData);
     appendDealerCard(cardData);
    });
      };

function getJSON(url, cb) {
  JSONP_PROXY = 'https://jsonp.afeld.me/?url='
  // THIS WILL ADD THE CROSS ORIGIN HEADERS

  var request = new XMLHttpRequest();

  request.open('GET', JSONP_PROXY + url);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      cb(JSON.parse(request.responseText));
    }
  };

	request.send();
 }

 //working on drawing 2 cards per player on the start game click
function appendPlayerCard(cardData){
  draw.on("click", function() {
  var $table=$("table");
  $table.append("<tr></tr>");
  var $target=$("tr:last");
  $target.append("<td>" + "<img src=" + cardData.cards[0].image + "></img>" + "</td>");
  $target.append("<td>" + "<img src=" + cardData.cards[1].image + "></img>" + "</td>");
  $target.append("<td>" + playerScoreTotal + "</td>");

if(cardData.cards[0].value + cardData.cards[1].value <= 21){
  alert("Blackjack! Player Wins!");
      }
  })
  }
function appendDealerCard(cardData){
 draw.on("click", function() {
  var $table=$("table");
  var $target=$("tr:last");
  $target.append("<td>" + "<img src=" + cardData.cards[2].image + "></img>" + "</td>");
  $target.append("<td>" + "<img class='cardBack' src=" + "http://i.imgur.com/xsqMd2z.jpg" + "></img>" + "</td>");
  if(cardData.cards[2].value + cardData.cards[3].value === 21){
  alert("Blackjack! Dealer Wins!");
      }
  })
 };
});
