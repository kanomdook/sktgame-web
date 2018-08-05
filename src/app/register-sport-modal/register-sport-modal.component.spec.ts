import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSportModalComponent } from './register-sport-modal.component';

describe('RegisterSportModalComponent', () => {
  let component: RegisterSportModalComponent;
  let fixture: ComponentFixture<RegisterSportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
