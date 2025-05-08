import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCardsComponent } from './ride-cards.component';

describe('RideCardsComponent', () => {
  let component: RideCardsComponent;
  let fixture: ComponentFixture<RideCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
