import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderEmptyComponent } from './placeholder-empty.component';

describe('PlaceholderEmptyComponent', () => {
  let component: PlaceholderEmptyComponent;
  let fixture: ComponentFixture<PlaceholderEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceholderEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
