const mongoose    =   require("mongoose");

// create instance of Schema
const mongoSchema =   mongoose.Schema;
// create schema
const playerSchema  = new mongoSchema({
  "rank": Number,
  "name": String,
  "guid": String,
  "pbGuid": String,
  "teamId": Number,
  "squadId": Number,
  "sessionKills": Number,
  "sessionDeaths": Number,
  "sessionScore": Number,
  "ping": Number,
  "alive": Boolean,
  "teamkills": Number,
  "sessionPlaytime": Number,
  "connecttime": Number,
  "lastswitchtime": Number,
  "lastForcedSwitchTime": Number,
  "numberOfFocedSwitches": Number,
  "numberOfSwitches": Number,
  "ip": String,
  "country": String,
  "visits": Number,
  "roundTimeSeconds": Number,
  "updated_at": { type: Date, expires: 5}
},
{
  timestamps: true
});

const update = {
   
};

// create model if not exists.
let Player = mongoose.model('Player',playerSchema);

module.exports = Player;
