import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalformComponent } from './globalform.component';

describe('GlobalformComponent', () => {
  let component: GlobalformComponent;
  let fixture: ComponentFixture<GlobalformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
