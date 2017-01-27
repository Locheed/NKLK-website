import { Component, OnInit } from '@angular/core';

import { IStats } from '../stats/stats';
import { StatsService } from '../shared/stats.service';

@Component({
  templateUrl: './stats-soldiername.component.html',
  styleUrls: ['./_stats-soldiername.component.sass']
})
export class StatsSoldiernameComponent implements OnInit {

  pageTitle: string = "Stats by Soldier Name";
  errorMessage: string;
  stats: IStats[];

  constructor(private _StatsService: StatsService) { }

  getByName(soldierName: string) {
    this._StatsService.getBySoldierName(soldierName)
        .subscribe((...stats) => this.stats = stats,
              error => this.errorMessage = <any>error);
            
  }

  ngOnInit() {

  }
}
