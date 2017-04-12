// Deprecated and abandoned API from RConnet


import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class ScoreboardService {

  constructor(private _http: Http) { }

  getScoreBoard() {
    return this._http.get('/api/scores')
          .map((response: Response) => response)
          // .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  getTeam0() {
    return Observable.interval(10000).flatMap(() => this._http.get('/api/scores/0')
    .map((response: Response) => response.json()))
          //.do(data => console.log('Scores_1_All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }
  
  getTeam1() {
    return Observable.timer(0, 10000).flatMap(() => this._http.get('/api/scores/1')
    .map((response: Response) => response.json()))
          //.do(data => console.log('Scores_1_All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }
  getTeam2() {
    //return this._http.get('/api/scores/2')
    return Observable.timer(0, 10000).flatMap(() => this._http.get('/api/scores/2')
    .map((response: Response) => response.json()))
           //.do(data => console.log('Scores_2_All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  serverInfo() {
    //return this._http.get('/api/scores/2')
    return Observable.timer(0, 10000).flatMap(() => this._http.get('/api/serverinfo')
    .map((response: Response) => response.json()))
           //.do(data => console.log('Serverinfo is: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
