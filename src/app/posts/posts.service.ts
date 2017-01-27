import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private _http: Http) { }

  getAllPosts() {
    return this._http.get('/api/posts')
      .map(res => res.json().data);
  }

}
