import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyTrustComponent } from './safety-trust.component';

describe('SafetyTrustComponent', () => {
  let component: SafetyTrustComponent;
  let fixture: ComponentFixture<SafetyTrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafetyTrustComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyTrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
