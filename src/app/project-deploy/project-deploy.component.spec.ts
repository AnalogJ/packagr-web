import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeployComponent } from './project-deploy.component';

describe('ProjectDeployComponent', () => {
  let component: ProjectDeployComponent;
  let fixture: ComponentFixture<ProjectDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
