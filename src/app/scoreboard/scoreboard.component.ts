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
  
  // Deprecated and abandoned API from RConnet

  
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

  //Alert range
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
    console.log('prefix: ' + this.prefix);
    console.log('sortBy: ' + sortBy);
    
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

    console.log("Team0 length : " + this.countTeam0);
    this.countTeam1 = this.team1.length;
    this.countTeam2 = this.team2.length;
    this.timeNow = Math.floor(Date.now() / 1000);
    console.log("Time now: " + this.timeNow);

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
    console.log(this.roundTimeFull);
     
    this.roundTimeFullSeconds = this.serverinfo.roundTimeFull;
    this.roundStartTime = this.serverinfo.roundStartTime;
    this.roundTime  = new Date(1970, 0, 1).setSeconds(this.roundTimeFullSeconds);

    
/*
    // Convert squadID number to string
    switch (this.team1.squadId) {
      case 1: 
        return this.team1.squadId = "AlphaX";
      
      case 2: 
        this.squadID = "Bravo";
      break; 
      case 3: 
        this.squadID = "Charlie";
      break; 
      case 4: 
        this.squadID = "Delta";
      break; 
      case 5: 
        this.squadID = "Echo" ;
      break;
      case 6: 
        this.squadID = "Foxtrot";
      break; 
      case 7: 
        this.squadID = "Golf" ;
      break;
      case 8: 
        this.squadID = "Hotel";
      break; 
      case 9: 
        this.squadID = "India";
      break; 
      case 10: 
        this.squadID = "Juliet";
      break;
      case 11: 
        this.squadID = "Kilo" ;
      break;
      case 12: 
        this.squadID = "Lima" ;
      break;
      case 13: 
        this.squadID = "Mike" ;
      break;
      case 14: 
        this.squadID = "November";
      break; 
      case 15: 
        this.squadID = "Oscar";
      break; 
      case 16: 
        this.squadID = "Papa" ;
      break;
      case 17: 
        this.squadID = "Quebec";
      break;
      case 18: 
        this.squadID = "Romeo";
      break; 
      case 19: 
        this.squadID = "Sierra";
      break;
      case 20: 
        this.squadID = "Tango";
      break; 
      case 21: 
        this.squadID = "Uniform";
      break;
      case 22: 
        this.squadID = "Victor";
      break;
      case 23: 
        this.squadID = "Whiskey";
      break;
      case 24: 
        this.squadID = "X-Ray";
      break; 
      case 25: 
        this.squadID = "Yankee";
      break;
      case 26: 
        this.squadID = "Zulu";
      break;
    };*/
    
    /* Replaced by better api update

    // Change mapcode to real map name
    switch (this.serverinfo.currentMap) {

      // China Rising maps
      case "XP1/Levels/XP1_001/XP1_001":
        this.currentMap = "Silk Road";
      break;
      case "XP1/Levels/XP1_002/XP1_002":
        this.currentMap = "Altai Range";
      break;
      case "XP1/Levels/XP1_003/XP1_003":
        this.currentMap = "Guilin Peaks";
      break;
      case "XP1/Levels/XP1_004/XP1_004":
        this.currentMap = "Dragon Pass";
      break;

      // Second Assault maps
      case "XP0/Levels/MP_007/XP0_Caspian":
        this.currentMap = "Caspian Border";
      break;
      case "XP0/Levels/MP_012_Firestorm/XP0_Firestorm":
        this.currentMap = "Operation Firestorm";
      break;
      case "XP0/Levels/MP_Subway/XP0_Metro":
        this.currentMap = "Operation Metro";
      break;
      case "XP0/Levels/XP1_002_Oman/XP0_Oman":
        this.currentMap = "Gulf of Oman";
      break;

      // Dragon's Teeth maps
      case "XP3/Levels/XP3_Marketplace/XP3_MarketPI":
        this.currentMap = "Pearl Market";
      break;
      case "XP3/Levels/XP3_Propaganda/XP3_Prpganda":
        this.currentMap = "Propaganda";
      break;
      case "XP3/Levels/XP3_UrbanGarden/XP3_UrbanGdn":
        this.currentMap = "Lumphini Garden";
      break;
      case "XP3/Levels/XP3_Waterfront/XP3_WtrFront":
        this.currentMap = "Sunken Dragon";
      break;

      // Final stand maps
      case "XP4/Levels/XP4_Arctic/XP3_Arctic":
        this.currentMap = "Operation Whiteout";
      break;
      case "XP4/Levels/XP4_SubBase/XP3_SubBase":
        this.currentMap = "Hammerhead";
      break;
      case "XP4/Levels/XP4_Titan/XP3_Titan":
        this.currentMap = "Hangar 21";
      break;
      case "XP4/Levels/XP4_WalkerFactory/XP3_WlkrFtry":
        this.currentMap = "Giants Of Karelia";
      break;
    };
    */
   
  }
  ngOnDestroy() {
    // Deprecated and abandoned API from RConnet
    this.subscriptionTeam0.unsubscribe();
    this.subscriptionTeam1.unsubscribe();
    this.subscriptionTeam2.unsubscribe();
    this.subscriptionServerinfo.unsubscribe();
  }


}
