import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishrideTimeComponent } from './publishride-time.component';

describe('PublishrideTimeComponent', () => {
  let component: PublishrideTimeComponent;
  let fixture: ComponentFixture<PublishrideTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishrideTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishrideTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
