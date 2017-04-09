const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const mongoose    =   require("mongoose");
const geoip = require('geoip-lite-country');
const API = require('./keys.js');

const Player = require('../../model/mongo');

mongoose.connect('mongodb://localhost:27017/nklk');

const app = express();

// Make random string for hash
function makeid(text)
{
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( let i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// Call random string from makeid for salt and SHA1 hash API-key.
let genAPI;
(function IIFE() {
  let text = "";
  let salt = makeid(text);

  const hash = crypto.createHash('sha1');
    hash.update(API.APIKEY + salt);
    let hashedAPI = hash.digest('hex');
    console.log("Generated has-key: " + hashedAPI);

  genAPI = API.API_BASE_URL + hashedAPI + "&salt=" + salt + API.PLAYER_API_URL;
    console.log(genAPI);

  return genAPI;
})();

// XFILES SERVER API

router.route('/serverinfo').get(function(req,res) {
    request.post({
      url: API.XFILE_SERVER + API.XFILE_APIKEY,
      json: true,
      gzip: true
      //headers: {
       //"content-type": "application/json",
      //},
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //body = JSON.parse(body);
          res.json(body.data.snapshot);
/*
          for (let player of body.data.snapshot.teamInfo) {
                Player.findOneAndUpdate(
                    { name: body.data.snapshot.teaminfo[i].players[j].name },
                    {$set: {
                        guid: item.guid,
                              
                        
                      }
                    },
                    { new: true, upsert: true },
                    function(err, model) {
                      if (err) {
                        console.log("Update failed." + err);
                      } else {
                        console.log("saved: " + model);
                        //createNewModel();
                      }
                  }
                );
          };    */   
          console.log("Body stringi: " + JSON.stringify(body));
        } else if (error) {
          console.log("Something went wrong fetching serverinfo" + error);
        }
    });
    
    //console.log(req);
});

/* GET api listing. */
router.route('/scores/:id').get(function(req, res) {
  makeRequest();

  Player.find({ teamId: req.params.id}, function(err, team) {
    if (err) {
       return res.send(err);
    }
      res.json(team);
      });
  
  
});

//router.get('/scores', (req, res, next) => {
  function makeRequest() {

  //let interval = setInterval(function() {
      request({
          url: genAPI,
          json: true
          
          //gzip: true
      }, function (error, response, body) {

          if (!error && response.statusCode === 200) {
              //console.log("body", body) // Print the json response
              Player.remove({}, function(err, result) {
                if (err) console.log("Deletion failed:" + err)
                else {
                  console.log("Removed all: " + result);
                  
                  setData(body);
                  }
          }); 
          //response.end();      
          } else {
              console.log("Something went wrong with polling: " + error);

              } 
      }); //request.end();
 // }, 10*1000);
//next();
  }


function setData(body) {
  if (body.datalist[0] != null && body.datalist.length > 0) {
    
    for( let item of body.datalist) {
      console.log(item);
      
      let geo = {};
      if (item.ip != null && item.ip != '') {
        geo = geoip.lookup(item.ip.toString());  
      } else {
         geo = {
          country: "na"
        };
      }
      Player.findOneAndUpdate(
          { name: item.name },
          {$set: {
              rank: item.rank,
              name: item.name,
              guid: item.guid,
              pbGuid: item.pbGuid,
              teamId: item.teamId,
              squadId: item.squadId,
              sessionKills: item.sessionKills,
              sessionDeaths: item.sessionDeaths,
              sessionScore: item.sessionScore,
              ping: item.ping,
              alive: item.alive,
              teamkills: item.teamkills,
              sessionPlaytime: item.sessionPlaytime,
              connecttime: item.connecttime,
              lastswitchtime: item.lastswitchtime,
              lastForcedSwitchTime: item.lastForcedSwitchTime,
              numberOfFocedSwitches: item.numberOfFocedSwitches,
              numberOfSwitches:item.numberOfSwitches,
              ip: item.ip,
              country: geo.country.toLowerCase(),
              visits: item.visits,
              roundTimeSeconds: item.roundTimeSeconds,
              
             }
          },
          { new: true, upsert: true },
          function(err, model) {
            if (err) {
              console.log("Update failed." + err);
            } else {
              console.log("saved: " + model);
              //createNewModel();
            }
        }
      );
      /*function createNewModel() {
        let player = new Player(item);
        player.save(function (err) {
            if (err) { 
                console.log(err);
            }
            else {
                console.log("Saved item: " + player);
            }
        });
      }*/
    
    }
  } else {
    //clearInterval(interval);
    console.log("Server is empty.");
  }

}


/*

router.get("/scoreboard", (req,res,next)  => {
    request(genAPI, (err, res, body) => {

      if (!err && res.statusCode == 200) {
          let json = JSON.parse(body);
          console.log(json);
          return res;
      }
    });
    res.json();
  });


        const db = new mongoOp();
        let response = {};

        //db.rank = res.body.rank;
        db.save(function (err) {
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });


// Get all scores from MongoDB
router.get("/scoreboar", (req, res, next) => {
    let response = {};
    mongoOp.find({}, (err,data) => {
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        response = {"error" : false,"message" : data};
      }
      res.json(response);
    });
  });



// Get all posts
let response;
router.get('/scores', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${genAPI}`)
  .then(scores => {
    res.status(200).json(scores.data);
    console.log("Datalist is " + scores.data.datalist.length);
    if (scores.data.datalist[0] != null && scores.data.datalist.length > 0) {
      /*for( let item of scores.data.datalist) {
        createPlayers(item);

      }

    }
    //console.log(req.query);
    //console.log(scores.data);

    })
    .catch(error => {
      res.status(500).send(error)
    });
    //console.log("req.body: " + req.body);

});

function createPlayers(item) {
  if (!player.find({ name: item.name })) {
    let playerAdd = new player();
    }
    playerAdd.name = [item.name];
    player.save();
};

router.post('/fetch', (req, res) => {

  let data = new player(response.datalist);
  data.save();

});
*/


module.exports = router;
