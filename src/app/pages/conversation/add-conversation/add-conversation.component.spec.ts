import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConversationComponent } from './add-conversation.component';

describe('AddConversationComponent', () => {
  let component: AddConversationComponent;
  let fixture: ComponentFixture<AddConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddConversationComponent]
    });
    fixture = TestBed.createComponent(AddConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
