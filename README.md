# Node scripts to automate Trello Workflow
### Introduction
These are node scripts based on a modified version of the trello workflow suggested by John Sonmez 
in this [blog article](http://simpleprogrammer.com/2014/02/17/secret-ridiculous-productivity-im-using-now/).

The scripts leverage the node wrapper [node-trello](https://github.com/adunkman/node-trello) to make the necessary API calls

To schedule the scripts, I use the built-in linux task scheduler cron.

### config.js

This is the file which contains all key, tokens or UUIDs for your board.  You can get more information about generating your API key by reading the documentation of the node-trello project [here](https://github.com/adunkman/node-trello).

You can use [this API call](https://trello.com/docs/api/board/index.html#get-1-boards-board-id-lists) to get the id's for all lists in the given board.

### dailyMaintenance.js

The dailyMaintenance file is split up in to 3 different tasks that I have setup to happen on a daily basis.  The first one is archiving all cards in a done state from the previous day.  The second one updates the position of the list based on the current day so that the next day is always the leftmost board (after Today and Done).  The last task simply moves all cards from the current day in to the today list.

### schedulerTemplate.js

This is an example script that creates a sample card, adds it to an array and creates the cards using the card creator script. Depending on the days of the week you would like the card to be created, you can modify the schedule property of the card.

### Cron Jobs
Below is the configuration of the tasks that I have scheduled in cron:

```
#Daily Maintenance
0 4 * * * nodejs /trello/dailyMaintenance.js
#Every Sunday at 6AM
0 10 * * 0 nodejs /trello/weeklyCards.js
#First Sunday of Every Month
0 10 * * 0 [ $(date +\%d) -le 07 ] && nodejs /trello/monthlyCards.js
#Every Other Sunday at 6AM
0 10 * * 0/2 nodejs /trello/biweeklyCards.js
#Every 3rd week
0 10 * * 0/3 nodejs /trello/everyThirdWeekCards.js
```
