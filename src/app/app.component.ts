import { Component } from '@angular/core';
import {KENDO_CHAT} from '@progress/kendo-angular-conversational-ui';

@Component({
  selector: 'app-root',
  imports: [KENDO_CHAT],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chatlens';
}
