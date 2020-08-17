import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PostService } from '../_services/post.services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts = null;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll()
      .pipe(first())
      .subscribe(posts => this.posts = posts);
  }

  deletePost(id: Number) {
    this.posts = this.posts.filter(x => x.id !== id);
  }

}
