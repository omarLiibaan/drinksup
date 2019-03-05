import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbarAdminPage } from './modalbar-admin.page';

describe('ModalbarAdminPage', () => {
  let component: ModalbarAdminPage;
  let fixture: ComponentFixture<ModalbarAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbarAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbarAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
