import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWithdrawComponent } from './manage-withdraw.component';

describe('ManageWithdrawComponent', () => {
  let component: ManageWithdrawComponent;
  let fixture: ComponentFixture<ManageWithdrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
