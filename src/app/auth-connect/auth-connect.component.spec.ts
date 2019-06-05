import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthConnectComponent } from './auth-connect.component';

describe('AuthConnectComponent', () => {
  let component: AuthConnectComponent;
  let fixture: ComponentFixture<AuthConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
