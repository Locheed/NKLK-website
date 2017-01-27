import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { IStats } from '../stats/stats';
import { StatsService } from '../shared/stats.service';


@Component({
  selector: 'app-all-stats',
  templateUrl: './all-stats.component.html',
  styleUrls: ['./_all-stats.component.sass'],

})
export class AllStatsComponent implements OnInit {

  pageTitle: string = "Server statistics All";
  errorMessage: string;
  @Input() stats: IStats[];
  page: number = 1;
  


  constructor(private _StatsService: StatsService) { }

  ngOnInit() {
    this._StatsService.getByAllTime()
        .subscribe(stats => this.stats = stats,
            error => this.errorMessage = <any>error);


  }

}
