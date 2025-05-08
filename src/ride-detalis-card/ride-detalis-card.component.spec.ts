import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDetalisCardComponent } from './ride-detalis-card.component';

describe('RideDetalisCardComponent', () => {
  let component: RideDetalisCardComponent;
  let fixture: ComponentFixture<RideDetalisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideDetalisCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideDetalisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
