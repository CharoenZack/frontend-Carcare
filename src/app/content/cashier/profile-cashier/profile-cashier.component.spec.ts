import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCashierComponent } from './profile-cashier.component';

describe('ProfileCashierComponent', () => {
  let component: ProfileCashierComponent;
  let fixture: ComponentFixture<ProfileCashierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCashierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
