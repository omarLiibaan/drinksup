import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRatingsPage } from './modal-ratings.page';

describe('ModalRatingsPage', () => {
  let component: ModalRatingsPage;
  let fixture: ComponentFixture<ModalRatingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRatingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRatingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
