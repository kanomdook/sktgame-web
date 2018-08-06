import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSportComponent } from './report-sport.component';

describe('ReportSportComponent', () => {
  let component: ReportSportComponent;
  let fixture: ComponentFixture<ReportSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
