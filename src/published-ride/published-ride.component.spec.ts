import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedRideComponent } from './published-ride.component';

describe('PublishedRideComponent', () => {
  let component: PublishedRideComponent;
  let fixture: ComponentFixture<PublishedRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedRideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
