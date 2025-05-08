import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRouteComponent } from './select-route.component';

describe('SelectRouteComponent', () => {
  let component: SelectRouteComponent;
  let fixture: ComponentFixture<SelectRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
