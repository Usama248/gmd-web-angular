import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridNoDataFoundSvgTemplateComponent } from './grid-no-data-found-svg-template.component';

describe('GridNoDataFoundSvgTemplateComponent', () => {
  let component: GridNoDataFoundSvgTemplateComponent;
  let fixture: ComponentFixture<GridNoDataFoundSvgTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GridNoDataFoundSvgTemplateComponent]
    });
    fixture = TestBed.createComponent(GridNoDataFoundSvgTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
