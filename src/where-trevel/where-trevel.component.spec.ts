import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereTrevelComponent } from './where-trevel.component';

describe('WhereTrevelComponent', () => {
  let component: WhereTrevelComponent;
  let fixture: ComponentFixture<WhereTrevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhereTrevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhereTrevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
