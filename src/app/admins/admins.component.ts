import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { ScoreboardService } from '../scoreboard/scoreboard.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.sass']
})

export class AdminsComponent implements OnInit {

private subscriptionPlayers: any;
private playersinfo: any = [];
private errorMessage: string;
public adminsPlaying: any = [];
private nick: string;
private idNum: string;

private blog = "http://battlelog.battlefield.com/bf4/user/"

  public founders = [
        {
            url: "../../assets/img/profiles/elanto.gif",
            nick: "Elant0",
            
            realName: "xxxxx",
            role: "Overlord",
            status: "ACTIVE",
            playing: true,
            idNum: "182315421",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/dlight007.jpg",
            nick: "DLight007",
            realName: "xxxxx",
            role: "Midget lover",
            status: "ACTIVE",
            playing: false,
            idNum: "943091382",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/xfilefin.jpg",
            nick: "XfileFIN",
            realName: "xxxxx",
            role: "Plugins wizard",
            status: "ACTIVE",
            playing: false,
            idNum: "806262072",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/locheed.jpg",
            nick: "Locheed",
            realName: "xxxxx",
            role: "Webmaster",
            status: "ACTIVE",
            playing: false,
            idNum: "218914927",
            flag: "../../assets/img/flags/finland.jpg"
        } 
    ]

    public admins = [
          {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Minefield78",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "ZZ-Ka1stu",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Moksu-FIN",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "SamiKill3r",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "rytkonet",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Toebsel",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/switzerland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Malakatta",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "DodgeUkko",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "HardMolli",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "J0loma",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/viljamimies.jpg",
            nick: "viljamimies",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Tokkeli",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/luteenvarjo.jpg",
            nick: "Luteenvarjo",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "rivakka",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Vuuti",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "R33_GTRnismo",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/sweden.jpg"
        },
        {
            url: "../../assets/img/profiles/vastaheitto.jpg",
            nick: "Vastaheitto",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Retkis",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "CrAzyW0mAn",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "EESTI-POLITSEI",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/estonia.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Skaffa247",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/netherlands.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "narkoze-LV",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/latvia.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "HC_hitsari",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Nuukeri",
            realName: "",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "ASniperKing",
            realName: "",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "-RK62-makkara",
            realName: "",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "TheNmiet",
            realName: "",
            role: "Admin",
            status: "M I A",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Westphald",
            realName: "",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/belgium.jpg"
        },
        {
            url: "../../assets/img/profiles/nebuq.jpg",
            nick: "Nebuq",
            realName: "",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/hc_hitsari.jpg",
            nick: "HC-hitsari",
            realName: "",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "",
            nick: "",
            realName: "",
            role: "",
            status: "",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/european.jpg"
        },
        {
            url: "",
            nick: "",
            realName: "",
            role: "",
            status: "",
            playing: false,
            idNum: "",
            flag: "../../assets/img/flags/european.jpg"
        }
    ]
  

  constructor(private _scoreboardservice: ScoreboardService) { }

  ngOnInit() {
    this.subscriptionPlayers = this._scoreboardservice.serverInfo()
        .subscribe(playersinfo => {
            this.playersinfo = playersinfo;

           let index = Object.keys(this.playersinfo.teamInfo);
           index.forEach(n => {
               let playerId = Object.keys(this.playersinfo.teamInfo[n].players);
               playerId.forEach(m => {
                   this.founders.forEach(founder => { 
                       if (founder.idNum == m) {
                           console.log("true:" + m + "founder: " + founder.idNum);
                          founder.playing = true; 
                       } else {
                           console.log("false:" + m + "founder: " + founder.idNum);
                          // founder.playing = false;
                       }
                    
                    });
                       
                   
                    console.log(this.playersinfo.teamInfo[n].players[m].name);
                    console.log("Players on server: " + m);

                  // this.adminsPlaying.indexOf(this.playersinfo.teamInfo[n].players[m].name) === -1 ? this.adminsPlaying.push(this.playersinfo.teamInfo[n].players[m].name) : console.log("This item already exists");
                  //this.adminsPlaying.splice(1,1);
                   //console.log("Playing: " + this.adminsPlaying);
               });
           });
        },
            error => this.errorMessage = <any>error);
    
  }

  ngDoCheck() {
      
      if (this.founders[3].idNum === this.idNum) {
          
          console.log("Haha: " + this.founders[3].nick);
          this.founders[3].playing = true;
        }
  }
  
  
  ngOnDestroy() {
    // Deprecated and abandoned API from RConnet
    this.subscriptionPlayers.unsubscribe();
  }

}
