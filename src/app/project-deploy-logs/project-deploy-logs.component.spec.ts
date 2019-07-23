import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeployLogsComponent } from './project-deploy-logs.component';

describe('ProjectDeployLogsComponent', () => {
  let component: ProjectDeployLogsComponent;
  let fixture: ComponentFixture<ProjectDeployLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDeployLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeployLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
