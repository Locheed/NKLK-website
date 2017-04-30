import { Injectable, Input } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { IStats } from '../stats/stats';
import { IToplist } from '../toplist/toplist';

@Injectable()
export class StatsService {
  //private _statsGetDatesUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getDates';
  private _statsByAllTimeUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByAllTimeSQL';
  private _statsSoldierNameUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByAllTimeSQL?soldierName=';
  //private _statsByYearUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByYearSQL?year=';
  private _statsByDateUrl = 'http://niskalaukausdataapi.azurewebsites.net:80/api/Niskalaukaus/getByDateSQL?logDate=';
  //private _statsByMonthUrl = 'http://niskalaukausdataapi.azurewebsites.net/api/Niskalaukaus/getByMonth?year=2017&month=';




  constructor(private _http: Http) { }

stats: IStats[];
toplist: IToplist[];


  /* Not used
  getDates(): Observable<IStats[]>  {
    return this._http.get(this._statsGetDatesUrl)
          .map((response: Response) => <IStats[]> response.json().data)

          //.do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  } */


  getByAllTime(): Observable<IStats[]>  {
    return this._http.get(this._statsByAllTimeUrl)
          .map((response: Response) => <IStats[]> response.json().data)
          //  .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  getBySoldierName(personaname: string): Observable<IStats[]>  {
    return this._http.get(this._statsSoldierNameUrl + personaname)
          .map((response: Response) =>
          <IStats[]> response.json().data)
          //.do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);



  }
  /* Not in use at the moment.
  getByYear(date: string): Observable<IStats[]>  {
    return this._http.get(this._statsByYearUrl + date)
          .map((response: Response) => <IStats[]> response.json().data)
        //  .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  } */

  /* Not used right now.
  getByMonth(month: number): Observable<IStats[]>  {
    return this._http.get(this._statsByMonthUrl + month)
          .map((response: Response) => <IStats[]> response.json().data)
        //  .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }*/

  getTopList(): Observable<IToplist[]> {
    return this._http.get('/api/stats/halloffame')
          .map((response: Response) => <IToplist[]> response.json())
          //.do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  getByDate(date: string): Observable<IStats[]>  {
    return this._http.get(this._statsByDateUrl + date)
          .map((response: Response) => { 
            if (response.json().success === false) {  // Check if database is down or no data available.
                console.warn(response.json().message);  // Log error message.
                this.stats = <IStats[]> response.json().data;
                return this.stats;
            } else {
            
              this.stats = <IStats[]> response.json().data;
              return this.stats;
          }
          })
          //.do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
          
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
