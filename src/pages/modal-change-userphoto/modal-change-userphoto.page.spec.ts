import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeUserphotoPage } from './modal-change-userphoto.page';

describe('ModalChangeUserphotoPage', () => {
  let component: ModalChangeUserphotoPage;
  let fixture: ComponentFixture<ModalChangeUserphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeUserphotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeUserphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
