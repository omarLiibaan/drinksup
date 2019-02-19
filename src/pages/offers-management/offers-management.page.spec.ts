import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersManagementPage } from './offers-management.page';

describe('OffersManagementPage', () => {
  let component: OffersManagementPage;
  let fixture: ComponentFixture<OffersManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersManagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
