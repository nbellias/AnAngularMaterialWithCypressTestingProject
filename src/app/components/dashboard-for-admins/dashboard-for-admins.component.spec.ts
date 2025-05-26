import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardForAdminsComponent } from './dashboard-for-admins.component';

describe('DashboardForAdminsComponent', () => {
  let component: DashboardForAdminsComponent;
  let fixture: ComponentFixture<DashboardForAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardForAdminsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardForAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
