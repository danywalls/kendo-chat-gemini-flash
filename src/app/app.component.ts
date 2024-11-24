import {Component, signal} from '@angular/core';
import {KENDO_CHAT, Message, SendMessageEvent, User} from '@progress/kendo-angular-conversational-ui';
import {KENDO_TEXTAREA} from '@progress/kendo-angular-inputs';
import {KENDO_BUTTONS} from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-root',
  imports: [KENDO_CHAT, KENDO_TEXTAREA, KENDO_BUTTONS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  user: User = {
    id: 2,
    name: 'John Doe',
  }

  messages = signal<Message[]>([
    {
      text: 'Hello! how I can help you?',
      author: {
        id: 1,
        name: 'Gemini'
      }
    }
  ])

  addMessage(message: SendMessageEvent) {
    this.messages.update((m => [...m, message.message]));
  }

  onInputFocus() {

  }

  onInputBlur() {

  }

  onKeyDown($event: KeyboardEvent) {

  }

  onFileSelect($event: Event) {

  }
}
