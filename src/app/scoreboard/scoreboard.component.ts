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
  scores: any = [];
  team0: any = [];
  team1: any = [];
  team2: any = [];
  squadID: string;
  countTeam0: number;
  countTeam1: number = 0;
  countTeam2: number = 0;
  errorMessage: string;
  subscriptionTeam0: any;
  subscriptionTeam1: any;
  subscriptionTeam2: any;
  subscriptionServerinfo: any;
  timeNow: number = Date.now() / 1000;
  roundTimeFullSeconds: number;
  roundStartTime: number;
  roundTime: any;
  hideJoining = true;
  private isLoading = true;

  // Alert range
  warningMin: number = 2.2; // 2.2 - 2.4 kpm. warning coloring
  warningMax: number = 2.4;
  alertMin: number = 2.5; // 2.5 - 50 kpm. alert coloring
  alertMax: number = 50;

  // Serverinfo vars
  serverinfo: any = [];
  currentMap: string;
  currentMode: string;
  maxPlayers: number;
  waitingPlayers: number;
  roundTimeFull: any;
  currentCountPlayers: number;
  tickets: number = 0;
  ticketsMax: number = 0;
  bases: number = 0;
  basesMax: number = 0;


  // Vars for sorting
  config: string;
  prefix: string = '-';
  asc: boolean = true;
  sortableCol: string;


  // Scoreboard action urls
  blogUrl: string = "http://battlelog.battlefield.com/bf4/user/";
  istatsUrlFirst: string = "https://i-stats.net/index.php?action=pcheck&player=";
  istatsUrlSec: string = "&game=BF4&sub=Check+Player";
  metaBansUrl: string = "http://metabans.com/search/?phrase=";
  fairplayUrl: string = "https://www.247fairplay.com/CheatDetector/";


  constructor(private _scoreboardservice: ScoreboardService) { }

  // Sorting config
  sort(event, sortBy) {
    event.preventDefault();
    this.sortableCol = sortBy;
    this.config = this.prefix + sortBy;
    this.prefix = this.prefix === '-' ? '+' : '-';
    this.asc = this.prefix === '-' ? true : false;

  }

  
  ngOnInit() {
    // Deprecated and abandoned API from RConnet
    
    
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
        .subscribe(serverinfo => this.serverinfo = serverinfo,
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
