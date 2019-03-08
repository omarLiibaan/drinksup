import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarUserPage } from './bar-user.page';

describe('BarUserPage', () => {
  let component: BarUserPage;
  let fixture: ComponentFixture<BarUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
