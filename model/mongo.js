const mongoose    =   require("mongoose");

// create instance of Schema
const mongoSchema =   mongoose.Schema;
// create schema for players
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

const toplistSchema  = new mongoSchema({
  "id": Number,
  "name": String,
  "country": String,
  "kills": Number,
  "deaths": Number,
  "score": Number,
  "visits": Number,
  "playtime": Number,
  "last_active": Number,
  "updated_at": { type: Date, expires: 5}
},
{
  timestamps: true
});

// create model if not exists.
let Player = mongoose.model('Player',playerSchema);
let TopList = mongoose.model('TopList',toplistSchema);

module.exports = {
  Player: Player,
  TopList: TopList
};
