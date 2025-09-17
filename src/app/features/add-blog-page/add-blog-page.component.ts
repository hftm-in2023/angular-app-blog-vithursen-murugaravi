import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="padding:24px">
      <h1>Add Blog</h1>
      <p>Die Implementierung des Formulars ist out of scope. Diese Seite wurde als Lazy-Loaded Feature erstellt.</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBlogPageComponent {}


