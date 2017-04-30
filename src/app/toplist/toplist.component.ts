import { Component, OnInit } from '@angular/core';

import { IToplist } from './toplist';
import { StatsService } from '../shared/stats.service';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./_toplist.component.sass']
})
export class ToplistComponent implements OnInit {

private errorMessage: string;
public toplist: IToplist[];
public serverMessage: string;
private monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
private tempDate = new Date();
public month: string = this.monthNames[this.tempDate.getMonth()];
public year: number = this.tempDate.getFullYear();

  constructor(private _StatsService: StatsService) { }

  ngOnInit() {
    this._StatsService.getTopList()
        .subscribe(toplist => {
                    this.toplist = toplist;
                    if (!this.toplist) {
                          this.serverMessage = "Nothing here at the moment... Refreshing databases... try later or pick another date.";
                        } else {this.serverMessage = ''}
                    this.toplist.forEach(x => {
                      x.country = x.country.toLowerCase();
                      x.kd = x.kills / x.deaths;
                    });
                    
        },
            error => this.errorMessage = <any>error);
  }

}
