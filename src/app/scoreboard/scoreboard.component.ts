import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";

import { ScoreboardService } from "./scoreboard.service";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./_scoreboard.component.sass"]
})
export class ScoreboardComponent implements OnInit {
  // Scoreboard vars
  private scores: any = [];
  public team0: any = [];
  public team1: any = [];
  public team2: any = [];
  public squadID: string;
  public countTeam0: number;
  public countTeam1: number = 0;
  public countTeam2: number = 0;
  private errorMessage: string;
  private subscriptionTeam0: any;
  private subscriptionTeam1: any;
  private subscriptionTeam2: any;
  private subscriptionServerinfo: any;
  private timeNow: number = Date.now() / 1000;
  public roundTimeFullSeconds: number;
  private roundStartTime: number;
  public hideJoining = true;
  public isLoading = true;
  private adminsArray = [
    "Elant0",
    "DLight007",
    "Locheed",
    "xfileFIN",
    "ASniperKing",
    "CrAzyW0mAn",
    "HardMolli",
    "HC_hitsari",
    "Luteenvarjo",
    "Malakatta",
    "Minefield78",
    "Moksu-FIN",
    "narkoze-LV",
    "Retkis",
    "Vastaheitto",
    "viljamimies",
    "Vuuti",
    "jorma_lumimies",
    "MrNicke",
    "22Damnation",
    "Bellwhacker",
    "advancedpuddle6",
    "ElleThePhant"
  ];

  /*
  private playersPlaying = [];
  private playersWithId: any = {};
  private players: any = [];
  private id;
  private battlebloginfo: any = [];
  private subscriptionbattleblog: any;
 */
  // Alert range
  public warningMin: number = 2.4; // 2.2 - 2.4 kpm. warning coloring
  public warningMax: number = 2.6;
  public alertMin: number = 2.7; // 2.5 - 50 kpm. alert coloring
  public alertMax: number = 50;
  public warningMinPing: number = 100; // 100 - 199 ping. warning coloring
  public warningMaxPing: number = 199;
  public alertMinPing: number = 200; // 200 - 500 ping. alert coloring
  public alertMaxPing: number = 500;

  // Serverinfo vars
  public serverinfo: any = [];
  public currentMap: string;
  public currentMode: string;
  public maxPlayers: number;
  public waitingPlayers: number;
  public roundTimeFull: any;
  public currentCountPlayers: number;
  public tickets: number = 0;
  public ticketsMax: number = 0;
  public bases: number = 0;
  public basesMax: number = 0;

  /*
  // Vars for sorting
  private config: string;
  private prefix: string = '-';
  private asc: boolean = true;
  private sortableCol: string;
*/

  // Scoreboard action urls
  private blogUrl: string = "http://battlelog.battlefield.com/bf4/user/";
  private istatsUrlFirst: string = "https://i-stats.net/index.php?action=pcheck&player=";
  private istatsUrlSec: string = "&game=BF4&sub=Check+Player";
  private metaBansUrl: string = "http://metabans.com/search/?phrase=";
  private fairplayUrl: string = "https://www.247fairplay.com/CheatDetector/";

  constructor(private _scoreboardservice: ScoreboardService) {}

  // Sorting config
  // sort(event, sortBy) {
  // event.preventDefault();
  //this.sortableCol = sortBy;
  //this.config = this.prefix + sortBy;
  //this.prefix = this.prefix === '-' ? '+' : '-';
  //this.asc = this.prefix === '-' ? true : false;

  //}
  /* Unimplemented stat fetching
  hover($event: any, name: string) {
      for (let i = 0; i < this.playersWithId.players.length; i++) {
          let nick = this.playersWithId.players[i].name;
          if (name === nick) {
            this.id = this.playersWithId.players[i].id
          }
      }
    this._scoreboardservice.getDataHover(this.id)
        .subscribe(battlebloginfo => {
                  this.battlebloginfo = battlebloginfo;
              },
          error => this.errorMessage = <any>error);
    }
  */

  // ngFor trackby players guid id. Less DOM changes.
  trackById(index, stat) {
    return stat.guid;
  }
  ngOnInit() {
    this._scoreboardservice
      .getScoreBoard()
      .subscribe(
        scores => (this.scores = scores),
        error => (this.errorMessage = <any>error)
      );

    this.subscriptionTeam0 = this._scoreboardservice
      .getTeam0()
      .subscribe(team0 => {
        this.team0 = team0;
        this.team0.forEach(x => {
          x.sessionPlaytime = this.timeNow - x.connecttime - 600;
          x.lastswitchtime > 0
            ? (x.lastswitchtime = this.timeNow - x.lastswitchtime - 600)
            : (x.lastswitchtime = 0);
          x.kd = x.sessionKills / x.sessionDeaths;
          x.kpm = x.sessionKills / (x.roundTimeSeconds / 60);
        });
      }, error => (this.errorMessage = <any>error));

    this.subscriptionTeam1 = this._scoreboardservice
      .getTeam1()
      .subscribe(team1 => {
        this.team1 = team1;
        this.team1.forEach(x => {
          x.sessionPlaytime = this.timeNow - x.connecttime - 600;
          x.lastswitchtime = this.timeNow - x.lastswitchtime - 600;
          x.kd = x.sessionKills / x.sessionDeaths;
          x.kpm = x.sessionKills / (x.roundTimeSeconds / 60);
        });

        this.isLoading = false;
      }, error => (this.errorMessage = <any>error));

    this.subscriptionTeam2 = this._scoreboardservice
      .getTeam2()
      .subscribe(team2 => {
        this.team2 = team2;
        this.team2.forEach(x => {
          x.sessionPlaytime = this.timeNow - x.connecttime - 600;
          x.lastswitchtime = this.timeNow - x.lastswitchtime - 600;
          x.kd = x.sessionKills / x.sessionDeaths;
          x.kpm = x.sessionKills / (x.roundTimeSeconds / 60);
          /*     this.players.forEach(y => {
                                if(y.name === x.name) {
                                  console.log("middle: " + x.kit + " y-kit: " + y.kit);
                                  x.kit = y.kit;
                                  console.log("inside: " + x.kit + " y-kit: " + y.kit);
                                }
                              });
                              //this.players.findIndex(y => y.name === x.name) >= 1 ? x.kit = "found" : x.kit = 8;
                                console.log(x.kit);*/
        });
      }, error => (this.errorMessage = <any>error));

    this.subscriptionServerinfo = this._scoreboardservice
      .serverInfo()
      .subscribe(serverinfo => {
        this.serverinfo = serverinfo;

        /*
           this.playersPlaying = [];    // Reset playersPlaying array on every fetch
           let i = 0;
           const index = Object.keys(this.serverinfo.teamInfo);    // Trick to access numeric Object.keys.
           let playerIndex = [];

           index.forEach(n => {
               const playerId = Object.keys(this.serverinfo.teamInfo[n].players);
               playerId.forEach(m => {
                     this.players.findIndex(x => x.name === this.serverinfo.teamInfo[n].players[m].name) === -1 ? this.players.push({
                                "name" : this.serverinfo.teamInfo[n].players[m].name,
                                "id"  : m,
                                "kit" : this.serverinfo.teamInfo[n].players[m].kit

                            }) : console.log("This id already exists");
                            this.playersWithId.players = this.players;
                            i++;
                    });
           });*/
      }, error => (this.errorMessage = <any>error));
  }

  ngDoCheck() {
    this.countTeam0 = this.team0.length;

    // Show joining scoreboard if someone is joining.
    if (this.countTeam0 > 0) {
      this.hideJoining = false;
    } else {
      this.hideJoining = true;
    }

    this.countTeam1 = this.team1.length;
    this.countTeam2 = this.team2.length;
    this.timeNow = Math.floor(Date.now() / 1000);

    // Update serverinfo
    this.currentMap = this.serverinfo.currentLevel;
    this.currentMode = this.serverinfo.gameMode;
    this.maxPlayers = this.serverinfo.maxPlayers;
    this.waitingPlayers = this.serverinfo.waitingPlayers;
    this.currentCountPlayers = this.countTeam1 + this.countTeam2;
    this.tickets = this.serverinfo.rush;
    if (this.serverinfo.rush) {
      this.tickets = this.serverinfo.rush.attackers.tickets;
      this.ticketsMax = this.serverinfo.rush.attackers.ticketsMax;
      this.bases = this.serverinfo.rush.defenders.bases;
      this.basesMax = this.serverinfo.rush.defenders.basesMax;
    }

    this.roundTimeFullSeconds = this.serverinfo.roundTimeFull;
  }
  ngOnDestroy() {
    this.subscriptionTeam0.unsubscribe();
    this.subscriptionTeam1.unsubscribe();
    this.subscriptionTeam2.unsubscribe();
    this.subscriptionServerinfo.unsubscribe();
  }
}
