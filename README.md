# Node scripts to automate Trello Workflow
###Introduction
These are node scripts based on a modified version of the trello workflow suggested by John Sonmez 
in this [blog article](http://simpleprogrammer.com/2014/02/17/secret-ridiculous-productivity-im-using-now/).
To schedule the scripts, I use the built-in job scheduler in Ubuntu cron.

###config.js

###cardCreator.js

###dailyMaintenance.js

###schedulerTemplate.js

###Cron Jobs
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
