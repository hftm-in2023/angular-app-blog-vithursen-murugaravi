
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner.component';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SpinnerComponent
  ],
  templateUrl: './blog-form.component.html'
})
export class BlogFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() loading = false;

  @Output() submit = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
}
