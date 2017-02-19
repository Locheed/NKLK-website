import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class ScoreboardService {

  constructor(private _http: Http) { }
/*
  getScoreBoard() {
    return this._http.get('/api/scores')
          .map((response: Response) => response)
          // .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }*/

  getTeam1() {
    return Observable.interval(5000).flatMap(() => this._http.get('/api/scores/1')
    .map((response: Response) => response))
          // .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }
  getTeam2() {
    return Observable.interval(5000).flatMap(() => this._http.get('/api/scores/2')
    .map((response: Response) => response))
          // .do(data => console.log('All: ' + JSON.stringify(data)))
          .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
