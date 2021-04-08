import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNewsComponent } from './movie-news.component';

describe('MovieNewsComponent', () => {
  let component: MovieNewsComponent;
  let fixture: ComponentFixture<MovieNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
