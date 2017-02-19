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
  scores: any = [];
  team1: any = [];
  team2: any = [];
  errorMessage: string;
  subscriptionTeam1: any;
  subscriptionTeam2: any;
  constructor(private _scoreboardservice: ScoreboardService) { }

  ngOnInit() {
    /*
    this._scoreboardservice.getScoreBoard()
        .subscribe(scores => this.scores = scores,
            error => this.errorMessage = <any>error);*/

    this.subscriptionTeam1 = this._scoreboardservice.getTeam1()
        .subscribe(team1 => this.team1 = team1,
            error => this.errorMessage = <any>error);

    this.subscriptionTeam2 = this._scoreboardservice.getTeam2()
        .subscribe(team2 => this.team2 = team2,
            error => this.errorMessage = <any>error);

  }
  ngOnDestroy() {
    this.subscriptionTeam1.unsubscribe();
    this.subscriptionTeam2.unsubscribe();
  }


}
