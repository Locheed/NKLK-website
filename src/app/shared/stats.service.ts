import { Injectable, Input } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IStats } from '../stats/stats';

@Injectable()
export class StatsService {
  private _statsGetDatesUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getDates';
  private _statsByAllTimeUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByAllTime';
  private _statsSoldierNameUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByAllTime?soldierName=';
  private _statsByYearUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByYear?year=';
  private _statsByDateUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByDate?logDate=';


  constructor(private _http: Http) { }



  getDates(): Observable<IStats[]>  {
    return this._http.get(this._statsGetDatesUrl)
          .map((response: Response) => <IStats[]> response.json().data)

          // .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }


  getByAllTime(): Observable<IStats[]>  {
    return this._http.get(this._statsByAllTimeUrl)
          .map((response: Response) => <IStats[]> response.json().data)
          //  .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  getBySoldierName(soldierName: string): Observable<IStats[]>  {
    return this._http.get(this._statsSoldierNameUrl + soldierName)
          .map((response: Response) =>
          <IStats[]> response.json().data)
          .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);



  }

  getByYear(date: string): Observable<IStats[]>  {
    return this._http.get(this._statsByYearUrl + date)
          .map((response: Response) => <IStats[]> response.json().data)
        //  .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  getByDate(date: string): Observable<IStats[]>  {
    return this._http.get(this._statsByDateUrl + date)
          .map((response: Response) => <IStats[]> response.json().data)
        //  .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
