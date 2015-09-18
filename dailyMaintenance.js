var Trello = require("node-trello");
var config = require("./config");

var t = new Trello(config.privateKey, config.token);

var date = new Date();

var dateMapper = {"0": config.Sunday,
                  "1": config.Monday,
                  "2": config.Tuesday,
                  "3": config.Wednesday,
                  "4": config.Thursday,
                  "5": config.Friday,
                  "6": config.Saturday};

var orderArray = [1, 2, 3, 4, 5, 6 ,7];
var currentDay = date.getDay();


//Archive All Cards in Done List
t.post("/1/lists/" + config.Done.id + "/archiveAllCards", {}, function(err, data){
  if (err) throw err;
  console.log(data);
});

//Rotate lists based on day of week
for (i = 0; i < currentDay+1; i++){
  var temp = orderArray.pop();
  orderArray.unshift(temp);
};

 for (i = 0; i < orderArray.length; i++) { 
   t.put("/1/lists/"+ dateMapper[i] + "/pos" , { value: (config.Done.pos + (date.getDate() % 6)*10 + (orderArray[i]))}, function(err, data){
     if (err) throw err;
       console.log(data);
  });
};

//Move cards to today list
t.post("/1/lists/" + dateMapper[currentDay]  + "/moveAllCards", { idBoard: config.board , idList: config.Today }, function(err, data){
  if (err) throw err;
  console.log(data);
});
