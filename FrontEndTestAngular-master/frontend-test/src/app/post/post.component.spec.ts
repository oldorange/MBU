import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../_services/post.services';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      imports: [ HttpClientModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data successfully', async(() => {
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(PostService);
    let compiled = fixture.debugElement.nativeElement;
    let spy = spyOn(dataService, 'getAll')
      .and.callThrough;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(app.posts.length).toBeGreaterThan(0);
      expect(compiled.querySelectorAll('.card').length).toBe(app.posts.length);
    });
  }));

  it('should delete data successfully', async(() => {
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(PostService);
    let spy = spyOn(dataService, 'getAll')
      .and.callThrough;
    fixture.whenStable().then(() => {
      const count = app.posts.length;
      app.deletePost(1);
      let posts = app.posts.filter(x => x.id === 1);
      let compiled = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      expect(posts.length).toBe(0);
      expect(compiled.querySelectorAll('.card').length).toBe(count - 1);
    });
  }));
});
