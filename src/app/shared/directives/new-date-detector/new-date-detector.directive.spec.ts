import { NewDateDetectorDirective } from './new-date-detector.directive';
import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div [appNewDateDetector]='item.createDate'></div>`,
})
class NewItemComponent {
  @ViewChild(NewDateDetectorDirective, { static: false })
  public directive: NewDateDetectorDirective;
  public item = { createDate: new Date() };
}

describe('NewDateDetectorDirective', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDateDetectorDirective, NewItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    const directive = new NewDateDetectorDirective();
    expect(directive).toBeTruthy();
  });

  it('should show item as new', () => {
    const item = fixture.debugElement.query(
      By.directive(NewDateDetectorDirective)
    );
    expect(item.classes['new-item']).toBe(true);
  });
});
