import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WashStatusComponent } from './wash-status.component';

describe('WashStatusComponent', () => {
  let component: WashStatusComponent;
  let fixture: ComponentFixture<WashStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WashStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WashStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
