import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchABarPage } from './search-a-bar.page';

describe('SearchABarPage', () => {
  let component: SearchABarPage;
  let fixture: ComponentFixture<SearchABarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchABarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchABarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
