import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../_services/login.services';
import {AuthGuard} from "../_helper/auth.guard";
import {PostComponent} from "../post/post.component";
import {ResourceComponent} from "../resource/resource.component";
import { NgZone } from '@angular/core';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let ngZone: NgZone;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientModule, RouterTestingModule
        .withRoutes(
        [
          { path: '', redirectTo: '/login', pathMatch: 'full' },
          { path: 'post', component: PostComponent, canActivate: [AuthGuard] },
          { path: 'login', component: LoginComponent },
          { path: 'resource', component: ResourceComponent, canActivate: [AuthGuard] }
        ])
        , ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ngZone = TestBed.inject(NgZone);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should login', async(() => {
    const debugElement = fixture.debugElement;
    let loginService = debugElement.injector.get(LoginService);
    let app = fixture.debugElement.componentInstance;
    component.form.controls['username'].setValue('eve.holt@reqres.in');
    component.form.controls['password'].setValue('cityslicka');
    let loginSpy = spyOn(loginService , 'login').and.callThrough();
    let routeSpy = spyOn(app.router , 'navigateByUrl').and.callThrough();
    ngZone.run(() => {
      component.onSubmit();
    });
    expect(loginService.login).toHaveBeenCalledWith('eve.holt@reqres.in','cityslicka');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(routeSpy).toHaveBeenCalledWith("/post");
    });
  }));
});
