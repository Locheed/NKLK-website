import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScoreboardService {
  private _baseApi: string = "http://37.187.25.126:8090/stats_api?server_id=45734&apikey=";
  private _restApi: string = "&action=getPlayers&offset=0&count=100&options=eaguid,pbguid";
  private _hashApi: string;
  constructor(private _http: Http) { }

  getScoreBoard() {
    return this._http.get('/api/scores')
          .map((response: Response) => response)
          //.do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
