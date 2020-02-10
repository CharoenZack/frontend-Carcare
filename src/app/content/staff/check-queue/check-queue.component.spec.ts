import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQueueComponent } from './check-queue.component';

describe('CheckQueueComponent', () => {
  let component: CheckQueueComponent;
  let fixture: ComponentFixture<CheckQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
