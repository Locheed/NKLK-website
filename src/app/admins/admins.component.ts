import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";

import { ScoreboardService } from "../scoreboard/scoreboard.service";

@Component({
  selector: "app-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.sass"]
})
export class AdminsComponent implements OnInit {
  private subscriptionPlayers: any;
  private playersinfo: any = [];
  private errorMessage: string;
  private playersPlaying: any = [];
  private foundersPlaying: any = [];
  private adminsPlaying: any = [];
  private nick: string;
  private idNum: string;
  private playingTitle: string = " is offline";

  private blog = "http://battlelog.battlefield.com/bf4/user/";

  public founders = [
    {
      url: "../../assets/img/profiles/dlight007.jpg",
      nick: "DLight007",
      realName: "xxxxx",
      role: "Midget lover",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "943091382",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/elanto.gif",
      nick: "Elant0",
      realName: "xxxxx",
      role: "Overlord",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "182315421",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/locheed.jpg",
      nick: "Locheed",
      realName: "xxxxx",
      role: "Webmaster",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "218914927",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/xfilefin.jpg",
      nick: "XfileFIN",
      realName: "xxxxx",
      role: "Plugins wizard",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "806262072",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "jorma_lumimies",
      realName: "",
      role: "Founder",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "1269186144",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/vastaheitto.jpg",
      nick: "Vastaheitto",
      realName: "xxxxx",
      role: "Founder",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "188907812",
      flag: "../../assets/img/flags/finland.jpg"
    }
  ];

  public admins = [
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "ASniperKing",
      realName: "",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "354678995",
      flag: "../../assets/img/flags/finland.jpg"
    },
    // {
    //   url: "../../assets/img/profiles/crazywoman.jpg",
    //   nick: "CrAzyW0mAn",
    //   realName: "xxxxx",
    //   role: "Admin",
    //   status: "ACTIVE",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "357568163",
    //   flag: "../../assets/img/flags/finland.jpg"
    // },
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "EESTI-POLITSEI",
    //     realName: "xxxxx",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "1057594252",
    //     flag: "../../assets/img/flags/estonia.jpg"
    // },
    // {
    //   url: "../../assets/img/profiles/noprofile.jpg",
    //   nick: "HardMolli",
    //   realName: "xxxxx",
    //   role: "Admin",
    //   status: "ACTIVE",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "505751513",
    //   flag: "../../assets/img/flags/finland.jpg"
    // },
    {
      url: "../../assets/img/profiles/hc_hitsari.jpg",
      nick: "HC-hitsari",
      realName: "",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "352465266",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/luteenvarjo.jpg",
      nick: "Luteenvarjo",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "366322278",
      flag: "../../assets/img/flags/finland.jpg"
    },
    /*{
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Malakatta",
            realName: "xxxxx",
            role: "Admin",
            status: "RETIRED",
            playing: false,
            playingTitle: " is offline",
            idNum: "354439187",
            flag: "../../assets/img/flags/finland.jpg"
        },*/
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "Minefield78",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "1055867487",
      flag: "../../assets/img/flags/finland.jpg"
    },
    // {
    //   url: "../../assets/img/profiles/noprofile.jpg",
    //   nick: "Moksu-FIN",
    //   realName: "xxxxx",
    //   role: "Admin",
    //   status: "ACTIVE",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "356382977",
    //   flag: "../../assets/img/flags/finland.jpg"
    // },
    // {
    //     url: "../../assets/img/profiles/nebuq.jpg",
    //     nick: "Nebuq",
    //     realName: "",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "372769934",
    //     flag: "../../assets/img/flags/finland.jpg"
    // },
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "R33_GTRnismo",
    //     realName: "xxxxx",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "354025805",
    //     flag: "../../assets/img/flags/sweden.jpg"
    // },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "Retkis",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "354482235",
      flag: "../../assets/img/flags/finland.jpg"
    },
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "rivakka",
    //     realName: "xxxxx",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "381166651",
    //     flag: "../../assets/img/flags/finland.jpg"
    // },
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "rytkonet",
    //     realName: "xxxxx",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "362333041",
    //     flag: "../../assets/img/flags/finland.jpg"
    // },
    /*{
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "SamiKill3r",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            playingTitle: " is offline",
            idNum: "501410015",
            flag: "../../assets/img/flags/finland.jpg"
        },*/
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "Skaffa247",
    //     realName: "xxxxx",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "997550639",
    //     flag: "../../assets/img/flags/netherlands.jpg"
    // },
    /*{
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "TheNmiet",
            realName: "",
            role: "Admin",
            status: "M I A",
            playing: false,
            playingTitle: " is offline",
            idNum: "345933780",
            flag: "../../assets/img/flags/finland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Toebsel",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            playingTitle: " is offline",
            idNum: "766030149",
            flag: "../../assets/img/flags/switzerland.jpg"
        },
        {
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "Tokkeli",
            realName: "xxxxx",
            role: "Admin",
            status: "ACTIVE",
            playing: false,
            playingTitle: " is offline",
            idNum: "902197558",
            flag: "../../assets/img/flags/finland.jpg"
        },*/
    {
      url: "../../assets/img/profiles/viljamimies.jpg",
      nick: "viljamimies",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "277958456",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "Vuuti",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "590369041",
      flag: "../../assets/img/flags/finland.jpg"
    },
    // {
    //     url: "../../assets/img/profiles/westphald.jpg",
    //     nick: "Westphald",
    //     realName: "",
    //     role: "Admin",
    //     status: "ACTIVE",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "353967569",
    //     flag: "../../assets/img/flags/belgium.jpg"
    // },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "MrNicke",
      realName: "",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "234889891",
      flag: "../../assets/img/flags/sweden.jpg"
    },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "22Damnation",
      realName: "",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: " 1084452677",
      flag: "../../assets/img/flags/united_kingdom.jpg"
    },
    // {
    //   url: "../../assets/img/profiles/noprofile.jpg",
    //   nick: "Bellwhacker",
    //   realName: "xxxxx",
    //   role: "Admin",
    //   status: "ACTIVE",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "215806199",
    //   flag: "../../assets/img/flags/united_kingdom.jpg"
    // },
    // {
    //   url: "../../assets/img/profiles/noprofile.jpg",
    //   nick: "advancedpuddle6",
    //   realName: "xxxxx",
    //   role: "Admin",
    //   status: "ACTIVE",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "827273359",
    //   flag: "../../assets/img/flags/finland.jpg"
    // },
    // {
    //   url: "../../assets/img/profiles/noprofile.jpg",
    //   nick: "ElleThePhant",
    //   realName: "xxxxx",
    //   role: "Admin",
    //   status: "ACTIVE",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "365956026",
    //   flag: "../../assets/img/flags/sweden.jpg"
    // },
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "-RK62-makkara",
    //     realName: "",
    //     role: "Admin",
    //     status: "M I A",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "38319094",
    //     flag: "../../assets/img/flags/finland.jpg"
    // },
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "-RK62-Nuukeri",
    //     realName: "",
    //     role: "Admin",
    //     status: "M I A",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "368721484",
    //     flag: "../../assets/img/flags/finland.jpg"
    // },
    /*{
            url: "../../assets/img/profiles/noprofile.jpg",
            nick: "95-Ka1stu",
            realName: "xxxxx",
            role: "Admin",
            status: "M I A",
            playing: false,
            playingTitle: " is offline",
            idNum: "366083000",
            flag: "../../assets/img/flags/finland.jpg"
        },*/
    // {
    //     url: "../../assets/img/profiles/noprofile.jpg",
    //     nick: "J0loma",
    //     realName: "xxxxx",
    //     role: "Admin",
    //     status: "M I A",
    //     playing: false,
    //     playingTitle: " is offline",
    //     idNum: "902250816",
    //     flag: "../../assets/img/flags/finland.jpg"
    // },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "narkoze-LV",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "987294553",
      flag: "../../assets/img/flags/latvia.jpg"
    },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "Tippitapitus",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "975174925",
      flag: "../../assets/img/flags/finland.jpg"
    },
    {
      url: "../../assets/img/profiles/noprofile.jpg",
      nick: "kiviviki",
      realName: "xxxxx",
      role: "Admin",
      status: "ACTIVE",
      playing: false,
      playingTitle: " is offline",
      idNum: "776396592",
      flag: "../../assets/img/flags/finland.jpg"
    }
    // {
    //   url: "",
    //   nick: "",
    //   realName: "",
    //   role: "",
    //   status: "",
    //   playing: false,
    //   playingTitle: " is offline",
    //   idNum: "",
    //   flag: "../../assets/img/flags/european.jpg"
    // }
  ];

  constructor(private _scoreboardservice: ScoreboardService) { }

  ngOnInit() {
    this.subscriptionPlayers = this._scoreboardservice
      .serverInfo()
      .subscribe(playersinfo => {
        this.playersinfo = playersinfo;
        this.playersPlaying = []; // Reset playersPlaying array on every fetch
        const index = Object.keys(this.playersinfo.teamInfo); // Trick to access numeric Object.keys.
        index.forEach(n => {
          const playerId = Object.keys(this.playersinfo.teamInfo[n].players);
          playerId.forEach(m => {
            this.playersPlaying.indexOf(parseInt(m, 10)) === -1
              ? this.playersPlaying.push(m)
              : console.log("This id already exists");

            this.founders.forEach(founder => {
              if (this.playersPlaying.indexOf(founder.idNum) != -1) {
                founder.playing = true;
                founder.playingTitle = " is playing on Niskalaukaus K-18";
                this.foundersPlaying.indexOf(founder.idNum) === -1
                  ? this.foundersPlaying.push(founder.idNum)
                  : console.log("This founder already plays");
              } else {
                founder.playing = false;
                const arrIndex = this.foundersPlaying.indexOf(founder.idNum);
                if (arrIndex !== -1) {
                  this.foundersPlaying.splice(arrIndex, 1);
                }
                founder.playingTitle = " is offline";
              }
            });
            this.admins.forEach(admin => {
              if (this.playersPlaying.indexOf(admin.idNum) != -1) {
                admin.playing = true;
                admin.playingTitle = " is playing on Niskalaukaus K-18";
              } else {
                admin.playing = false;
                admin.playingTitle = " is offline";
              }
            });
            // Debug console.log("Players in array: " + this.adminsPlaying);
          });
        });
      }, error => (this.errorMessage = <any>error));
  }

  ngDoCheck() { }

  ngOnDestroy() {
    this.subscriptionPlayers.unsubscribe();
  }
}
