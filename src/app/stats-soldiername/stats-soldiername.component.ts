import { Component, OnInit } from "@angular/core";

import { IStats } from "../stats/stats";
import { StatsService } from "../shared/stats.service";

@Component({
  templateUrl: "./stats-soldiername.component.html",
  styleUrls: ["./_stats-soldiername.component.sass"]
})
export class StatsSoldiernameComponent implements OnInit {
  public pageTitle: string = "Stats by Soldier Name";
  private errorMessage: string;
  stats: IStats[];
  public isLoading = false;
  public sortableCol = <any>{};
  public userName = <any>{};
  public sort = <any>{};

  constructor(private _StatsService: StatsService) {}

  getByName(personaname: string) {
    this.isLoading = true;
    this._StatsService.getBySoldierName(personaname).subscribe((...stats) => {
      this.stats = stats[0];
      this.isLoading = false;
    }, error => (this.errorMessage = <any>error));
  }

  ngOnInit() {}
}
