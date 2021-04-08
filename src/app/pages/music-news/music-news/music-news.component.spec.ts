import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicNewsComponent } from './music-news.component';

describe('MusicNewsComponent', () => {
  let component: MusicNewsComponent;
  let fixture: ComponentFixture<MusicNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
