import { Component, OnInit } from '@angular/core';


import { IStats } from './stats';
import { StatsService } from '../shared/stats.service';





@Component({
  templateUrl: './stats.component.html',
  styleUrls: ['./_stats.component.sass'],
})
export class StatsComponent implements OnInit {

private pageTitle: string = "Server statistics by date";
private errorMessage: string;
public stats: IStats[];
private myDatePickerOptions = {
      todayBtnTxt: 'Today',
      dateFormat: 'yyyy-mm-dd',
      firstDayOfWeek: 'mo',
      sunHighlight: true,
      height: '34px',
      width: '260px',
      inline: false,
      disableUntil: {year: 2016, month: 12, day: 20},
      selectionTxtFontSize: '16px',
      markCurrentDay: 'true',
      showDateFormatPlaceholder: false,
      customPlaceholderTxt: 'Today',
      showClearDateBtn: false

  };

private config: string;
private prefix: string = '-';
private asc: boolean = true;
private sortableCol: string;


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


  onDateChanged(event:any) {
    let date: string = event.formatted;
    this._StatsService.getByDate(date)
        .subscribe(stats => {
          this.stats = stats;
         },
            error => this.errorMessage = <any>error);
    console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }

  onCalendarViewChanged(event:any) {
    let date: string = event.year;
    this._StatsService.getByYear(date)
        .subscribe(stats => this.stats = stats,
            error => this.errorMessage = <any>error);
  console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
}





  ngOnInit(): void {
    let dateFormat: Date = new Date();
    let date: string = dateFormat.getFullYear() + "-" +(dateFormat.getMonth()+1) + "-" + dateFormat.getDate();
    this._StatsService.getByDate(date)
        .subscribe(stats => this.stats = stats,
            error => this.errorMessage = <any>error);
  }

}
