import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCleanerComponent } from './manage-cleaner.component';

describe('ManageCleanerComponent', () => {
  let component: ManageCleanerComponent;
  let fixture: ComponentFixture<ManageCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
