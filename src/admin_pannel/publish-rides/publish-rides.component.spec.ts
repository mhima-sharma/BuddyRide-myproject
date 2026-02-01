import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishRidesComponent } from './publish-rides.component';

describe('PublishRidesComponent', () => {
  let component: PublishRidesComponent;
  let fixture: ComponentFixture<PublishRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishRidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
