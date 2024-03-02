import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteComponent } from './components/note/note.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteComponent, HeaderComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'h-full',
  }
})
export class AppComponent {

}
