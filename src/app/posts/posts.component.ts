import { Component, OnInit } from '@angular/core';

import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {

  posts: any = [];
  constructor(private _postsService: PostsService) { }

  ngOnInit() {
    this._postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

}
