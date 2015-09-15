var config = require("./config");
var cardCreator = require("./cardCreator.js");

var scheduledCards = [];

var myFirstCard = {
        cardName: 'My First Daily Card',
        label: 'green',
        schedule: [config.Sunday, config.Monday, config.Tuesday, config.Wednesday, config.Thursday, config.Friday, config.Saturday]
};

scheduledCards.push(myFirstCard);

cardCreator.createCards(scheduledCards);
