var shuffleApi = "http://deckofcardsapi.com/api/shuffle/?deck_count=6"
var drawApi = "http://deckofcardsapi.com/api/draw/"
//<<deck_id>>/?count=2"
var API_PROXY = 'https://jsonp.afeld.me/?url=';
var API_URL = "http://deckofcardsapi.com/api";
var draw = $(".draw")

//"shuffles 6 decks, outputs data to drawcard/s"
$(".start").on("click", function startgame(){
  getJSON(shuffleApi, function (data) {
  drawCards(data);
  });
  function drawCards(data) {
    getJSON(drawApi + data.deck_id + "/?count=4", function (cardData) {
   console.log(cardData);
   console.log(cardData.cards[0]);
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

if(cardData.cards[0].value + cardData.cards[1].value === "21"){
  alert("Blackjack! Player Wins!");
      }
  })
  }
function appendDealerCard(cardData){
 $(".dealerDraw").on("click", function() {
  var $table=$("table");
  var $target=$("tr:last");
  $target.append("<td>" + "<img src=" + cardData.cards[2].image + "></img>" + "</td>");
  $target.append("<td>" + "<img class='cardBack' src=" + "http://i.imgur.com/xsqMd2z.jpg" + "></img>" + "</td>");

  if(cardData.cards[2].value + cardData.cards[3].value === "21"){
  alert("Blackjack! Dealer Wins!");
      }

  })
 };
});

//$.get(API_PROXY + API_URL + "/shuffle/?deck_count=6", setDeckId, 'json');


/*
function addMovieDetail(data, id){
  var $table=$(".table");
  $table.append("<tr></tr>");
  var $target=$("tr:last");
  $target.attr("data-id", id);
  $target.append("<td>" + data.Title + "</td>");
  $target.append("<td>" + data.imdbRating + "</td>");
  $target.append("<td>" + data.Year + "</td>");
  $target.append("<td><img width='200' height='250' src=" + data.Poster + "></img></td>");
  $target.append("<button class='delete'>Delete</button>");
};

$.get(FIREBASE_URL, function (movies) {
  Object.keys(movies).forEach(function (id) {
		addMovieDetail(movies[id], id);
  });
});
*/
