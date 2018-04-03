const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const request = require("request");
const mongoose = require("mongoose");
const geoip = require("geoip-lite-country");
const API = require("./keys.js");

const model = require("../../model/mongo");

//mongoose.connect("mongodb://localhost:27017/nklk");
mongoose.connect(API.mongoUrl, { useMongoClient: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();

// Make random string for hash
function makeid(text) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

// Call random string from makeid for salt and SHA1 hash API-key.
let genAPI;
(function IIFE() {
  let text = "";
  let salt = makeid(text);

  const hash = crypto.createHash("sha1");
  hash.update(API.APIKEY + salt);
  let hashedAPI = hash.digest("hex");
  console.log("Generated has-key: " + hashedAPI);

  genAPI = API.API_BASE_URL + hashedAPI + "&salt=" + salt + API.PLAYER_API_URL;
  console.log(genAPI);

  return genAPI;
})();

// Hall of Fame stats
// Call random string from makeid for salt and SHA1 hash API-key.
let genTopAPI;
(function IIFE() {
  let text = "";
  let saltTop = makeid(text);

  const hashTop = crypto.createHash("sha1");
  hashTop.update(API.APIKEY + saltTop);
  let hashedTopAPI = hashTop.digest("hex");
  console.log("Generated has-key: " + hashedTopAPI);

  genTopAPI =
    API.API_BASE_URL + hashedTopAPI + "&salt=" + saltTop + API.STATS_API_URL;
  console.log(genTopAPI);

  return genTopAPI;
})();

// XFILES server api request

router.route("/serverinfo").get(function(req, res) {
  request.post(
    {
      url: API.XFILE_SERVER + API.XFILE_APIKEY,
      json: true,
      gzip: true
      //headers: {
      //"content-type": "application/json",
      //},
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json(body.data.snapshot);
        /* Small test to try to mix apidata to one table. Todo.
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
        console.log("Serverinfo data: " + JSON.stringify(body, undefined, 4));
      } else if (error) {
        console.log("Something went wrong fetching serverinfo" + error);
      }
    }
  );
});

/* GET Hall of Fame players. */
router.route("/stats/halloffame").get(function(req, res) {
  model.TopList.find({}, function(err, topPlayers) {
    if (err) {
      return res.send(err);
    }
    setTimeout(() => {
      res.json(topPlayers);
    }, 500);
  });
});

/* GET teams by id */
router.route("/scores/:id").get(function(req, res) {
  model.Player.find({ teamId: req.params.id }, function(err, team) {
    if (err) {
      return res.send(err);
    }
    setTimeout(() => {
      res.json(team);
    }, 500);
  });
});

// Start polling data from rconnet API to MongoDb.
makeRequest();
setInterval(() => {
  makeRequest();
}, 8000);

function makeRequest() {
  request(
    {
      url: genAPI,
      json: true
      //gzip: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        //console.log("body", body) // Print the json response
        model.Player.remove({}, function(err, result) {
          if (err) console.log("Deletion failed:" + err);
          else {
            console.log("Removed all: " + result);

            setData(body);
          }
        });
      } else {
        console.log("Something went wrong with polling: " + error);
      }
    }
  );
}

function setData(body) {
  if (body.datalist[0] !== null && body.datalist.length > 0) {
    for (let item of body.datalist) {
      //console.log(item);

      // Get location data by ip address.
      // Try catch added to find out problems with geoip location.
      let geo = {};
      try {
        if (item.ip !== null && item.ip !== "") {
          geo = geoip.lookup(item.ip.toString());
        } else {
          geo = {
            country: "na"
          };
        }
      } catch (e) {
        console.log("Geo-ip error: ", e);
      } finally {
        geo = {
          country: "na"
        };
      }
      model.Player.findOneAndUpdate(
        { name: item.name },
        {
          $set: {
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
            numberOfSwitches: item.numberOfSwitches,
            ip: item.ip,
            country: geo.country.toLowerCase(),
            visits: item.visits,
            roundTimeSeconds: item.roundTimeSeconds
          }
        },
        { new: true, upsert: true },
        function(err, model) {
          if (err) {
            console.log("Update failed." + err);
          } else {
            console.log("saved: " + model);
          }
        }
      );
    }
  } else {
    console.log("Server is empty.");
  }
}

// Start polling data from rconnet API to MongoDb. Hall of Fame stats
getTopList();
setInterval(() => {
  getTopList();
}, 10 * 20000);

function getTopList() {
  request(
    {
      url: genTopAPI,
      json: true
      //gzip: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        model.TopList.remove({}, function(err, result) {
          if (err) console.log("Deletion failed:" + err);
          else {
            console.log("Removed all: " + result);

            setTopListData(body);
          }
        });
      } else {
        console.log("Something went wrong with polling: " + error);
      }
    }
  );
}

function setTopListData(body) {
  if (body.datalist[0] !== null && body.datalist.length > 0) {
    for (let item of body.datalist) {
      //console.log(item);

      model.TopList.findOneAndUpdate(
        { name: item.name },
        {
          $set: {
            id: item.id,
            name: item.name,
            country: item.country,
            kills: item.kills,
            deaths: item.deaths,
            score: item.score,
            visits: item.visits,
            playtime: item.playtime,
            last_active: item.last_active
          }
        },
        { new: true, upsert: true },
        function(err, model) {
          if (err) {
            console.log("Update failed." + err);
          } else {
            console.log("saved: " + model);
          }
        }
      );
    }
  } else {
    console.log("No stats recorded");
  }
}

/*
function blogRequest() {
      request({
          url: http://battlelog.battlefield.com/bf4/warsawoverviewpopulate/218914927/01,
          json: true
          //gzip: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
              //console.log("body", body) // Print the json response
          }
        }
      });
  }*/

module.exports = router;
