import { Component, inject, signal } from '@angular/core';
import {
  KENDO_CHAT,
  Message,
  User,
} from '@progress/kendo-angular-conversational-ui';
import { GeminiService } from './services/gemini.service';
import {
  FileSelectComponent,
  KENDO_FILESELECT,
} from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-root',
  imports: [KENDO_CHAT, KENDO_FILESELECT],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  GEMINI_USER: User = { id: 1, name: 'Gemini' };
  JOHN_DOE_USER: User = { id: 2, name: 'John Doe' };

  INITIAL_MESSAGE: Message = {
    text: 'Hello! How I can help you with your website?',
    author: this.GEMINI_USER,
  };

  messages = signal<Message[]>([this.INITIAL_MESSAGE]);

  private geminiServiceInstance = inject(GeminiService);

  private addMessageToMessages(message: Message) {
    this.messages.update((m) => [...m, message]);
  }

  async uploadFile(fileSelectComponent: FileSelectComponent) {
    this.addMessageToMessages(this.createTypingMessage());
    const file = fileSelectComponent.fileList.firstFileToUpload[0]?.rawFile;
    if (file) {
      await this.handleFileUpload(file, fileSelectComponent);
    }
  }

  private createTypingMessage(): Message {
    return { typing: true, author: this.GEMINI_USER };
  }

  private async handleFileUpload(
    file: File,
    fileSelectComponent: FileSelectComponent,
  ) {
    try {
      const imageBase64 = await this.fileToBase64(file);
      const response =
        await this.geminiServiceInstance.getResponse(imageBase64);
      const responseMessage: Message = {
        author: this.GEMINI_USER,
        text: response,
      };
      this.addMessageToMessages(responseMessage);
    } finally {
      fileSelectComponent.fileList.clear();
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
