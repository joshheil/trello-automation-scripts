var Trello = require("node-trello");
var config = require("./config");

var createCards = function(cards)
{


var t = new Trello(config.privateKey, config.token);

cards.forEach(function(card)
{
        card.schedule.forEach(function(dayOfWeek){
                t.post("/1/cards", { name: card.cardName, labels: card.label , idList: dayOfWeek , due: null, urlSource: null } , function(err, data) {
                  if (err) throw err;
                  console.log(data);
                });
        });
});
};

module.exports.createCards = createCards;