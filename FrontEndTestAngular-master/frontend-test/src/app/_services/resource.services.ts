import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../_models/resource';

@Injectable({ providedIn: 'root' })
export class ResourceService {
    constructor(
        private http: HttpClient
    ) {
    }
    getAll() {
        return this.http.get<Resource>('https://reqres.in/api/unknown');
    }
}