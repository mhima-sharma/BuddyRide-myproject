import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatNewComponent } from './what-new.component';

describe('WhatNewComponent', () => {
  let component: WhatNewComponent;
  let fixture: ComponentFixture<WhatNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
