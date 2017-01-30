import { Component, OnInit, Input, ChangeDetectionStrategy, Output } from '@angular/core';

import { IStats } from '../stats/stats';
import { StatsService } from '../shared/stats.service';

@Component({
  selector: 'app-all-stats',
  templateUrl: './all-stats.component.html',
  styleUrls: ['./_all-stats.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
  
})
export class AllStatsComponent implements OnInit {

  pageTitle: string = 'Server statistics All';
  errorMessage: string;
  @Input() stats: IStats[];
  page: number = 1;
  nameFilter: string;
  config: string;
  prefix: string = '-';
  asc: boolean = true;
  sortableCol: string;
  


  constructor(private _StatsService: StatsService) { }

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
    this._StatsService.getByAllTime()
        .subscribe(stats => this.stats = stats,
            error => this.errorMessage = <any>error);
 }

}
