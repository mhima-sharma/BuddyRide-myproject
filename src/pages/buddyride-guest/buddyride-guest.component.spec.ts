import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyrideGuestComponent } from './buddyride-guest.component';

describe('BuddyrideGuestComponent', () => {
  let component: BuddyrideGuestComponent;
  let fixture: ComponentFixture<BuddyrideGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddyrideGuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddyrideGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
