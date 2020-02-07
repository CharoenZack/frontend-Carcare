import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPromotionComponent } from './check-promotion.component';

describe('CheckPromotionComponent', () => {
  let component: CheckPromotionComponent;
  let fixture: ComponentFixture<CheckPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
