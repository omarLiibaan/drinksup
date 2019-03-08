import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersAddbarPage } from './offers-addbar.page';

describe('OffersAddbarPage', () => {
  let component: OffersAddbarPage;
  let fixture: ComponentFixture<OffersAddbarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersAddbarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersAddbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
