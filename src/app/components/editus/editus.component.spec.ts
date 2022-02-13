import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusComponent } from './editus.component';

describe('EditusComponent', () => {
  let component: EditusComponent;
  let fixture: ComponentFixture<EditusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
