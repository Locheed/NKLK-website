import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { ScoreboardService } from './scoreboard.service';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./_scoreboard.component.sass'],

})
export class ScoreboardComponent implements OnInit {

  // Scoreboard vars
  private scores: any = [];
  private team0: any = [];
  private team1: any = [];
  private team2: any = [];
  private squadID: string;
  private countTeam0: number;
  private countTeam1: number = 0;
  private countTeam2: number = 0;
  private errorMessage: string;
  private subscriptionTeam0: any;
  private subscriptionTeam1: any;
  private subscriptionTeam2: any;
  private subscriptionServerinfo: any;
  private timeNow: number = Date.now() / 1000;
  private roundTimeFullSeconds: number;
  private roundStartTime: number;
  private roundTime: any;
  private hideJoining = true;
  private isLoading = true;
  private adminsArray = ['Elant0', 'Dlight007', 'Locheed', 'XfileFIN', '-RK62-makkara', '-RK62-Nuukeri', '95-Ka1stu', 'ASniperKing',
                         'CrAzyW0mAn', 'EESTI-POLITSEI', 'HardMolli', 'HC_hitsari', 'J0loma', 'Luteenvarjo', 'Malakatta', 'Minefield78',
                         'Moksu-FIN', 'narkoze-LV', 'Nebuq', 'R33_GTRnismo', 'Retkis', 'rivakka', 'rytkonet', 'Samikill3r', 'Skaffa247',
                         'TheNmiet', 'Toebsel', 'Tokkeli', 'Vastaheitto', 'viljamimies', 'Vuuti', 'Westphald'];
  /*
  private playersPlaying = [];
  private playersWithId: any = {};
  private players: any = [];
  private id;
  private battlebloginfo: any = [];
  private subscriptionbattleblog: any;
  */
  // Alert range
  private warningMin: number = 2.2; // 2.2 - 2.4 kpm. warning coloring
  private warningMax: number = 2.4;
  private alertMin: number = 2.5; // 2.5 - 50 kpm. alert coloring
  private alertMax: number = 50;

  // Serverinfo vars
  private serverinfo: any = [];
  private currentMap: string;
  private currentMode: string;
  private maxPlayers: number;
  private waitingPlayers: number;
  private roundTimeFull: any;
  private currentCountPlayers: number;
  private tickets: number = 0;
  private ticketsMax: number = 0;
  private bases: number = 0;
  private basesMax: number = 0;

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


  constructor(private _scoreboardservice: ScoreboardService) { }

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

  ngOnInit() {
    
    
    
    this._scoreboardservice.getScoreBoard()
        .subscribe(scores => this.scores = scores,
            error => this.errorMessage = <any>error);
    
    this.subscriptionTeam0 = this._scoreboardservice.getTeam0()
        .subscribe(team0 => this.team0 = team0,
            error => this.errorMessage = <any>error);
    

    this.subscriptionTeam1 = this._scoreboardservice.getTeam1()
        .subscribe(team1 => { this.team1 = team1;
                              this.isLoading = false; },
            error => this.errorMessage = <any>error);
            

    this.subscriptionTeam2 = this._scoreboardservice.getTeam2()
        .subscribe(team2 => this.team2 = team2,
            error => this.errorMessage = <any>error);
            
    
    this.subscriptionServerinfo = this._scoreboardservice.serverInfo()
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
           });
           */
          },
            error => this.errorMessage = <any>error);
  }

  ngDoCheck() {
    this.countTeam0 = this.team0.length;
    
    // Show joining scoreboard if someone is joining.
    if (this.countTeam0 > 0) {
      this.hideJoining = false;
    } else { this.hideJoining = true; }

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
    this.roundTimeFull = this.serverinfo.roundTimeFull * 1000;
    this.roundTimeFullSeconds = this.serverinfo.roundTimeFull;
    this.roundStartTime = this.serverinfo.roundStartTime;
    this.roundTime  = new Date(1970, 0, 1).setSeconds(this.roundTimeFullSeconds);

    

  }
  ngOnDestroy() {
    this.subscriptionTeam0.unsubscribe();
    this.subscriptionTeam1.unsubscribe();
    this.subscriptionTeam2.unsubscribe();
    this.subscriptionServerinfo.unsubscribe();
  }


}
