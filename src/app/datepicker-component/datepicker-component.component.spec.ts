import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponentComponent } from './datepicker-component.component';

describe('DatepickerComponentComponent', () => {
  let component: DatepickerComponentComponent;
  let fixture: ComponentFixture<DatepickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatepickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
