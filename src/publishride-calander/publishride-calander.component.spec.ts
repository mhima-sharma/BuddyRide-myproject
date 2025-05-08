import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishrideCalanderComponent } from './publishride-calander.component';

describe('PublishrideCalanderComponent', () => {
  let component: PublishrideCalanderComponent;
  let fixture: ComponentFixture<PublishrideCalanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishrideCalanderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishrideCalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
