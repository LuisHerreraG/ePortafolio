import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScaffoldComponent } from './main-scaffold.component';

describe('MainScaffoldComponent', () => {
  let component: MainScaffoldComponent;
  let fixture: ComponentFixture<MainScaffoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainScaffoldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainScaffoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
