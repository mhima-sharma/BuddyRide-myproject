import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyrideGuideComponent } from './buddyride-guide.component';

describe('BuddyrideGuideComponent', () => {
  let component: BuddyrideGuideComponent;
  let fixture: ComponentFixture<BuddyrideGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddyrideGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddyrideGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
