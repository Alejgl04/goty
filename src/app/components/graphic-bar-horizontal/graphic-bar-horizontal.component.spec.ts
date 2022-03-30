import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicBarHorizontalComponent } from './graphic-bar-horizontal.component';

describe('GraphicBarHorizontalComponent', () => {
  let component: GraphicBarHorizontalComponent;
  let fixture: ComponentFixture<GraphicBarHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicBarHorizontalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicBarHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
