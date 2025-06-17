import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './material-demo.component.html',
  styleUrls: ['./material-demo.component.scss']
})
export class MaterialDemoComponent {
 // 2-way binding (NgModel)
  username: string = '';
  isDarkMode: boolean = false;

  // click Event handler
  isVisible: boolean = true;

  // @for loop data
  users: string[] = ['Anna', 'Ben', 'Clara'];

  // @switch value
  get userRole(): string {
    if (this.username.toLowerCase() === 'admin') return 'Admin';
    return 'User';
  }

  // click Event handler method
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  // NgClass logic
  get currentClasses(): any {
    return {
      'highlighted': this.isDarkMode,
      'normal': !this.isDarkMode
    };
  }

  // NgStyle logic
  get currentStyles(): { [klass: string]: string } {
    return {
      'font-size': this.isDarkMode ? '20px' : '14px',
      'color': this.isDarkMode ? 'white' : 'black',
      'background-color': this.isDarkMode ? '#333' : '#eee'
    };
  }
}
