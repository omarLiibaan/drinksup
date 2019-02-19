import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsproprioPage } from './tabsproprio.page';

describe('TabsproprioPage', () => {
  let component: TabsproprioPage;
  let fixture: ComponentFixture<TabsproprioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsproprioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsproprioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
