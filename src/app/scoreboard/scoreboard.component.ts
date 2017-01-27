import { Component, OnInit } from '@angular/core';

import { ScoreboardService } from './scoreboard.service';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./_scoreboard.component.sass'],

})
export class ScoreboardComponent implements OnInit {
  scores: any = [];
  errorMessage: string;
  constructor(private _scoreboardservice: ScoreboardService) { }

  ngOnInit() {
    this._scoreboardservice.getScoreBoard()
        .subscribe(scores => this.scores = scores,
            error => this.errorMessage = <any>error);

  }

}
