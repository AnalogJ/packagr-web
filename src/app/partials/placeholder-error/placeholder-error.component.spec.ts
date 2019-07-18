import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderErrorComponent } from './placeholder-error.component';

describe('PlaceholderErrorComponent', () => {
  let component: PlaceholderErrorComponent;
  let fixture: ComponentFixture<PlaceholderErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceholderErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
