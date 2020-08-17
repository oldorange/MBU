import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceComponent } from './resource.component';
import { HttpClientModule } from '@angular/common/http';
import { ResourceService } from '../_services/resource.services';

describe('ResourceComponent', () => {
  let component: ResourceComponent;
  let fixture: ComponentFixture<ResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceComponent ],
      imports: [ HttpClientModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and render successfully', async(() => {
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(ResourceService);
    let compiled = fixture.debugElement.nativeElement;
    let spy = spyOn(dataService, 'getAll')
      .and.callThrough;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(app.resources.length).toBeGreaterThan(0);
      expect(compiled.querySelector('.card-body').style.test).toBeUndefined();
      expect(compiled.querySelector('.card-body').style.backgroundColor).not.toBeUndefined();
    });
  }));
});
