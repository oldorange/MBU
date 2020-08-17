import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../_models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
    constructor(
        private http: HttpClient
    ) {
    }
    getAll() {
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    }
}