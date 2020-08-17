import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ResourceService } from '../_services/resource.services';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  resources = null;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getAll()
      .pipe(first())
      .subscribe(resource => this.resources = resource.data);
  }
}
